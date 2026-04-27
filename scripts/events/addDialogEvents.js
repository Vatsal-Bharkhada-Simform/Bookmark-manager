import { bookmarkHandler } from "../handlers/bookmarkHandler.js";
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

        if (title && url) {
            let res = await bookmarkHandler.addNewBookmark({ title, url, tags: tagNames, collections: collectionNames, createdAt: new Date().toISOString() });
            console.log(res);
            if (res) {
                resetForm();
            }
        } else {
            alert('Please fill in both Title and URL fields.');
        }
    });
}

function resetForm() {
    dialogElements.form.reset();
    dialogElements.tagList.replaceChildren();
    dialogElements.collectionList.replaceChildren();
    dialogElements.dialog.close();
    dialogElements.confirm.disabled = false;
}

export { addDialogEvents, resetForm };