import { collectionHandler } from "../handlers/collectionHandler.js";
import { domElements } from "../views/domElements.js";

function addCollectionEvents(){
    domElements.collectionContainer.addEventListener("click", (e) => {
        let element = e.target;
        if(element.dataset?.type === "DELETE"){
            let parent = element.closest(".collapsible");
            collectionHandler.removeBookmark(element.dataset.id, parent.dataset.collectionName);
        }
    })
}

export { addCollectionEvents };