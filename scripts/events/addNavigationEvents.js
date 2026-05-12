import { domElements } from "../views/domElements.js";

let currentOpen = null;

function addNavigationEvents() {
    // Load the default page (Here: all bookmarks)
    loadDefault();

    // Load selected page from the sidebar
    domElements.sidebar.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            let targetId = e.target.href.split("#")[1] ?? "";
            let currentSelected = document.querySelector("[data-selected='true']");

            if (currentSelected) {
                currentSelected.dataset.selected = false;
            }
            e.target.dataset.selected = true;

            if (targetId) {
                let targetElement = document.querySelector(`#${targetId}`);

                if (currentOpen) {
                    currentOpen.style.display = "none";
                    currentOpen = targetElement;
                }

                targetElement.style.display = "flex";
            }
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
                currentOpen.style.display = "none";
                currentOpen = targetElement;
                targetElement.style.display = "flex";
            }
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
            targetElement.style.display = "flex";
            updateSidebarSelection(targetId);
            currentOpen = targetElement;
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