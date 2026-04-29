import { bookmarkHandler } from "../handlers/bookmarkHandler.js";
import { domElements } from "../views/domElements.js";
import { openEditDialog } from "./addDialogEvents.js";

function addBookmarkEvents() {
    domElements.tableBody.addEventListener("click", (e) => {
        let element = e.target;
        if (element.dataset.type === "edit" && element.dataset.id) {
            openEditDialog(bookmarkHandler.getBookmark(+element.dataset.id));
        }
    })

    domElements.deleteButton.addEventListener("click", () => {
        bookmarkHandler.deleteSelectedBookmark();
    })

    domElements.bookmarkSearch.addEventListener("input", (e) => {
        let query = e.target.value.trim().toLowerCase();
        bookmarkHandler.searchBookmarks(query);
    });

    domElements.filterDropdown.addEventListener("click", (e) => {
        handleDropdownEvents(e);
    })

    domElements.sortDropdown.addEventListener("click", (e) => {
        handleDropdownEvents(e);
    })
}

function handleDropdownEvents(e) {
    let target = e.target;
    if (target.className === "dropdown__label") {
        let dropdownContainer = target.nextElementSibling;
        dropdownContainer.classList.toggle("show");
    }
    else if (target.dataset.value !== undefined) {
        let value = target.dataset.value;
        let currentActive = document.querySelector(".dropdown__items > .active");

        if(currentActive && currentActive !== value){
            currentActive.classList.remove("active");
        }

        let res = bookmarkHandler.handleFilterAndSort(value);
        
        if(res){
            target.classList.add("active");
        } else {
            target.classList.remove("active");
        }
    }
}

export { addBookmarkEvents };