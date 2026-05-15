import { bookmarkHandler } from "../handlers/bookmarkHandler.js";
import { domElements } from "../views/domElements.js";

function addCollectionEvents(){
    // Remove bookmark from the selected collection
    domElements.collectionContainer.addEventListener("click", (e) => {
        let element = e.target;
        if(element.dataset?.type === "DELETE"){
            let parent = element.closest(".collapsible");
            if(!parent) return;
            bookmarkHandler.removeBookmarkFromCollection(element.dataset.id, parent.dataset.collectionName);
        } else if(element && element.tagName === "A" && element.dataset?.id){
            bookmarkHandler.incrementVisitCount(element.dataset.id);
        }
    })
}

export { addCollectionEvents };