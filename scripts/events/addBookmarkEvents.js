import { bookmarkHandler } from "../handlers/bookmarkHandler.js";
import { dialogElements } from "../views/dialogElements.js";
import { domElements } from "../views/domElements.js";
import { generateDeletableTag } from "../views/generateElements.js";

function addBookmarkEvents(){
    domElements.tableBody.addEventListener("click", (e) => {
        let element = e.target;
        if(element.dataset.type === "edit" && element.dataset.id){
            openEditDialog(bookmarkHandler.getBookmark(+element.dataset.id));
        }
    })
}

function openEditDialog(bookmark){
    dialogElements.form.dataset.mode = "EDIT";
    console.log(bookmark);
    console.log(dialogElements.form.elements["bookmark-title"]);

    dialogElements.form.elements["bookmark-title"].value = bookmark.title;
    dialogElements.form.elements["bookmark-url"].value = bookmark.url;

    if(bookmark.tags && bookmark.tags.length !== 0){
        bookmark.tags.forEach(tag => {
            let tagElement = generateDeletableTag(tag);
            dialogElements.tagList.appendChild(tagElement);
        })
    }

    if(bookmark.collections && bookmark.collections.length !== 0){
        bookmark.collections.forEach(collection => {
            let collectionElement = generateDeletableTag(collection);
            dialogElements.collectionList.appendChild(collectionElement);
        })
    }

    dialogElements.dialog.showModal();
}

export { addBookmarkEvents };