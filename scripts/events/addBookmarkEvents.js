import { bookmarkHandler } from "../handlers/bookmarkHandler.js";
import { dialogElements } from "../views/dialogElements.js";
import { domElements } from "../views/domElements.js";
import { generateDeletableTag } from "../views/generateElements.js";

function addBookmarkEvents() {
    // Open bookmark edit dialog
    domElements.bookmarkTableContainer.addEventListener("click", (e) => {
        let element = e.target;
        if (element.dataset.type === "edit" && element.dataset.id) {
            openEditDialog(bookmarkHandler.getBookmark(+element.dataset.id));
        }
    })

    // Delete selected bookmarks when delete button is clicked
    domElements.deleteButton.addEventListener("click", () => {
        bookmarkHandler.deleteSelectedBookmark();
    })

    // Trigger search query on change in input
    domElements.bookmarkSearch.addEventListener("input", (e) => {
        let value = e.target.value ?? "";
        let query = value.trim().toLowerCase();
        bookmarkHandler.searchBookmarks(query);
    });

    // Handle clicks on filter dropdown
    domElements.filterDropdown.addEventListener("click", (e) => {
        handleDropdownEvents(e);
        domElements.sortDropdown.lastElementChild.classList.remove("show");
    })

    // Handle clicks on sort dropdown
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

// Open dialog in EDIT mode.
// Populate form fields with existing values
function openEditDialog(bookmark){
    dialogElements.form.dataset.mode = "EDIT";
    dialogElements.form.dataset.id = bookmark.id;

    // Insert title and url in form inputs
    dialogElements.form.elements["bookmark-title"].value = bookmark.title;
    dialogElements.form.elements["bookmark-url"].value = bookmark.url;

    //Insert tags
    if(bookmark.tags && bookmark.tags.length !== 0){
        bookmark.tags.forEach(tag => {
            let tagElement = generateDeletableTag(tag);
            dialogElements.tagList.appendChild(tagElement);
        })
    }

    // Insert collections
    if(bookmark.collections && bookmark.collections.length !== 0){
        bookmark.collections.forEach(collection => {
            let collectionElement = generateDeletableTag(collection);
            dialogElements.collectionList.appendChild(collectionElement);
        })
    }

    // Modify dialog header and button text
    dialogElements.formTitle.textContent = "Edit bookmark";
    dialogElements.confirm.textContent = "Save changes";

    dialogElements.dialog.showModal();
}

// If dropdown is open, close it
// If an option from dropdown is selected invoke logic to handle it
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