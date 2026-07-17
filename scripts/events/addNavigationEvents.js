import { domElements } from "../views/domElements.js";

let currentOpen = null;

function addNavigationEvents() {
    // Mobile sidebar open/close toggle
    const sidebar = document.querySelector(".sidebar");
    const hamburgerBtn = document.querySelector(".header__name button[aria-label='Open sidebar']");
    const sidebarCloseBtn = document.querySelector(".sidebar__head button[aria-label='Close sidebar']");

    function openSidebar() {
        sidebar?.classList.add("open");
        hamburgerBtn?.setAttribute("aria-expanded", "true");
    }

    function closeSidebar() {
        sidebar?.classList.remove("open");
        hamburgerBtn?.setAttribute("aria-expanded", "false");
    }

    hamburgerBtn?.addEventListener("click", openSidebar);
    sidebarCloseBtn?.addEventListener("click", closeSidebar);

    // Close sidebar when clicking outside of it on mobile
    document.addEventListener("click", (e) => {
        if (sidebar?.classList.contains("open") && !sidebar.contains(e.target) && e.target !== hamburgerBtn) {
            closeSidebar();
        }
    });

    // Prevent loading invalid URL's. Load default page as fallback
    window.addEventListener('hashchange', function () {
        let hashValue = this.window.location.href.split("#")[1] ?? "";
        if(hashValue.includes("/")){
            hashValue = hashValue.split("/")[0];
        }
        let targetElement = this.document.querySelector(`#${hashValue}`);

        if(!targetElement){
            loadDefault();
        } else {
            if(targetElement === currentOpen) return;
            else {
                updateSidebarSelection(hashValue);
                if(currentOpen){
                    currentOpen.style.display = "none";
                }
                currentOpen = targetElement;
                targetElement.style.display = "flex";
            }
        }
    });
    
    // Load the default page (Here: all bookmarks)
    let defaultSelected = document.querySelector("[data-selected='true']");

    if(defaultSelected && defaultSelected.href){
        let defaultHref = defaultSelected.href.split("#")[1] ?? "";
        
        if(window.location.hash === "" || window.location.hash === "#"+defaultHref){
            loadDefault();
        } else {
            window.dispatchEvent(new HashChangeEvent("hashchange"));
        }
    }

    // Load selected page from the sidebar
    domElements.sidebar.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (link) {
            let targetId = link.href.split("#")[1] ?? "";
            let currentSelected = document.querySelector("[data-selected='true']");

            if(window.location.pathname !== "/") window.location.href = window.location.origin + "#" + targetId;

            if (currentSelected) {
                currentSelected.dataset.selected = false;
            }
            link.dataset.selected = true;

            if (targetId) {
                let targetElement = document.querySelector(`#${targetId}`);

                if (currentOpen) {
                    currentOpen.style.display = "none";
                }
                currentOpen = targetElement;

                targetElement.style.display = "flex";
            }

            // Close sidebar on mobile after navigation
            closeSidebar();
        }
    });
}

// Find page set as default page and render it
function loadDefault(){
    let defaultSelected = document.querySelector("[data-selected='true']");
    if (defaultSelected && defaultSelected.href) {
        let targetId = defaultSelected.href.split("#")[1] ?? "";

        if (targetId) {
            let targetElement = document.querySelector(`#${targetId}`);
            if(targetElement){
                targetElement.style.display = "flex";
                updateSidebarSelection(targetId);
                currentOpen = targetElement;
            }
        }

        window.location.href = `#${targetId}`;
    }
}

function updateSidebarSelection(targetId){
    let defaultSelected = document.querySelector("[data-selected='true']");
    let targetElement = document.querySelector(`a[href='#${targetId}']`);

    if(!defaultSelected || !targetElement) {
        window.location.href = window.location.origin;
        return;
    }

    defaultSelected.dataset.selected = false;
    targetElement.dataset.selected = true;
}

export { addNavigationEvents };
