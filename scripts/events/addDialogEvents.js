import { bookmarkHandler } from "../handlers/bookmarkHandler.js";
import { isValidForm, isValidText } from "../utils/bookmarkValidators.js";
import { dialogElements } from "../views/dialogElements.js";
import { generateDeletableTag } from "../views/generateElements.js";

function addDialogEvents() {
    dialogElements.btnAddBookmark.addEventListener('click', () => {
        dialogElements.form.dataset.mode = "ADD";
        dialogElements.dialog.showModal();
    });

    dialogElements.cancel.addEventListener('click', () => {
        resetForm();
        dialogElements.dialog.close();
    });

    dialogElements.tagInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            const tag = e.target.value?.trim();

            if (tag) {
                if(!isValidText(tag)){
                    alert("Please provide a proper tag name.");
                    return;
                }
                e.target.value = '';
                let tagElement = generateDeletableTag(tag);
                dialogElements.tagList.appendChild(tagElement);
            }
        }
    });

    dialogElements.collectionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            const collection = e.target.value?.trim();

            if (collection) {
                if(!isValidText(collection)){
                    alert("Please provide a proper collection name.");
                    return;
                }
                e.target.value = '';
                let collectionElement = generateDeletableTag(collection);
                dialogElements.collectionList.appendChild(collectionElement);
            }
        }
    });

    dialogElements.form.addEventListener('submit', async (e) => {
        e.preventDefault();
        dialogElements.confirm.disabled = true;
        let formData = new FormData(dialogElements.form);

        const title = formData.get('bookmark-title').trim();
        const url = formData.get('bookmark-url').trim();

        const collections = dialogElements.collectionList.querySelectorAll('.u-tag');
        const collectionNames = Array.from(collections).map(col => col.textContent);

        const tags = dialogElements.tagList.querySelectorAll('.u-tag');
        const tagNames = Array.from(tags).map(tag => tag.textContent);

        if(!isValidForm(title, url)){
            dialogElements.confirm.disabled = false;
            return;
        }

        if (title && url) {
            let res;
            try {
                if(dialogElements.form.dataset.mode === "ADD"){
                    res = await bookmarkHandler.addNewBookmark({ title, url, tags: tagNames, collections: collectionNames, createdAt: new Date().toISOString() });
                } else if (dialogElements.form.dataset.mode === "EDIT") {
                    let bookmark = bookmarkHandler.getBookmark(+dialogElements.form.dataset?.id);
                    res = await bookmarkHandler.editBookmark({ ...bookmark, title, url, tags: tagNames, collections: collectionNames });
                }
                if (res) {
                    resetForm();
                }
            } finally {
                dialogElements.confirm.disabled = false;
            }
        } else {
            alert('Please fill in both Title and URL fields.');
        }
    });
}

function resetForm() {
    dialogElements.form.reset();
    dialogElements.form.dataset.id = "";
    dialogElements.form.dataset.mode = "";

    dialogElements.tagList.replaceChildren();
    dialogElements.collectionList.replaceChildren();

    dialogElements.formTitle.textContent = "Add bookmark";
    dialogElements.confirm.textContent = "Add bookmark";
    dialogElements.confirm.disabled = false;
    
    dialogElements.dialog.close();
}

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

export { addDialogEvents, resetForm, openEditDialog };
