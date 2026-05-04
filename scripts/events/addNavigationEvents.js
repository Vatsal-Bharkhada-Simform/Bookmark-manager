import { domElements } from "../views/domElements.js";

let currentOpen = null;

function addNavigationEvents() {
    let defaultSelected = document.querySelector("[data-selected='true']");
    if (defaultSelected && defaultSelected.href) {
        let targetId = defaultSelected.href.split("#")[1] ?? "";

        if (targetId) {
            let targetElement = document.querySelector(`#${targetId}`);
            targetElement.style.display = "flex";
            currentOpen = targetElement;
        }
    }

    domElements.sidebar.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            let targetId = e.target.href.split("#")[1] ?? "";
            let currentSelected = document.querySelector("[data-selected='true']");
            
            if(currentSelected){
                currentSelected.dataset.selected = false;
            }
            e.target.dataset.selected = true;

            if (targetId) {
                let targetElement = document.querySelector(`#${targetId}`);

                if(currentOpen){
                    currentOpen.style.display = "none";
                    currentOpen = targetElement;    
                }

                targetElement.style.display = "flex";
            }
        }
    });
}

export { addNavigationEvents };