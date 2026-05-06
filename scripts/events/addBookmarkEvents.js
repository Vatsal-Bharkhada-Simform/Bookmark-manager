import { bookmarkHandler } from "../handlers/bookmarkHandler.js";
import { domElements } from "../views/domElements.js";
import { openEditDialog } from "./addDialogEvents.js";

function addBookmarkEvents() {
    domElements.bookmarkTableContainer.addEventListener("click", (e) => {
        let element = e.target;
        if (element.dataset.type === "edit" && element.dataset.id) {
            openEditDialog(bookmarkHandler.getBookmark(+element.dataset.id));
        }
    })

    domElements.deleteButton.addEventListener("click", () => {
        bookmarkHandler.deleteSelectedBookmark();
    })

    domElements.bookmarkSearch.addEventListener("input", (e) => {
        let value = e.target.value ?? "";
        let query = value.trim().toLowerCase();
        bookmarkHandler.searchBookmarks(query);
    });

    domElements.filterDropdown.addEventListener("click", (e) => {
        handleDropdownEvents(e);
        domElements.sortDropdown.lastElementChild.classList.remove("show");
    })

    domElements.sortDropdown.addEventListener("click", (e) => {
        handleDropdownEvents(e);
        domElements.filterDropdown.lastElementChild.classList.remove("show");
    })
    
    domElements.filterDropdown.addEventListener("blur", (e) => {
        if(!e.relatedTarget) {
            domElements.filterDropdown.lastElementChild.classList.remove("show");
        }
    }, true);

    domElements.sortDropdown.addEventListener("blur", (e) => {
        if(!e.relatedTarget) {
            domElements.sortDropdown.lastElementChild.classList.remove("show");
        }
    }, true);
}

function handleDropdownEvents(e) {
    let target = e.target;
    if (target.classList.contains("dropdown__label")) {
        let dropdownContainer = target.nextElementSibling;
        dropdownContainer.classList.toggle("show");
    }
    else if (target.dataset.value !== undefined) {
        let value = target.dataset.value;
        let parent = target.closest(".dropdown");

        let activeChild = parent?.querySelector(".active");
        activeChild?.classList.remove("active");

        let res = bookmarkHandler.handleFilterAndSort(value);
        
        if(res){
            target.classList.add("active");
        } else {
            target.classList.remove("active");
        }
    }
}

export { addBookmarkEvents };