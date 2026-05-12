import { bookmarkHandler } from "../handlers/bookmarkHandler.js";
import { isValidForm, isValidText } from "../utils/bookmarkValidators.js";
import { dialogElements } from "../views/dialogElements.js";
import { generateDeletableTag } from "../views/generateElements.js";

function addDialogEvents() {
    // Show dialog to add a new bookmark
    dialogElements.btnAddBookmark.addEventListener('click', () => {
        dialogElements.form.dataset.mode = "ADD";
        dialogElements.dialog.showModal();
    });

    // Close bookmark and reset form
    dialogElements.cancel.addEventListener('click', () => {
        resetForm();
        dialogElements.dialog.close();
    });

    // Generate tag element with specified tag name and add it to tag container
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

    // Generate collection tag with specified collection name and add it to collection container
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

    // Form submission handler
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

    dialogElements.tagInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const tag = e.target.value?.trim();
            if (tag) {
                // Add the tag to the UI (you can create a tag element and append it to a container)
                e.target.value = ''; // Clear the input after adding the tag
                let tagElement = document.createElement('span');
                tagElement.textContent = tag;
                tagElement.classList.add('u-tag');
                tagElement.style.backgroundColor = tagColors[tag[0].toUpperCase()]?.background || '#E0E0E0';
                tagElement.style.color = tagColors[tag[0].toUpperCase()]?.color || '#000000';
                tagElement.style.borderColor = tagColors[tag[0].toUpperCase()]?.border || '#E0E0E0';
                dialogElements.tagList.appendChild(tagElement);
            }
        }
    });
}

// Function to reset form fields
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


export { addDialogEvents, resetForm };
