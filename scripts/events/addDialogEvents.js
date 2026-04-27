import { addBookmark, getAllBookmarks } from "../controllers/bookmark.controller.js";
import { bookmarkHandler } from "../handlers/bookmarkHandler.js";
import { dialogElements } from "../views/dialogElements.js";
import tagColors from "../views/tagColors.js";

function addDialogEvents() {
    dialogElements.btnAddBookmark.addEventListener('click', () => {
        dialogElements.dialog.showModal();
    });

    dialogElements.cancel.addEventListener('click', () => {
        dialogElements.dialog.close();
    });

    dialogElements.tagInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const tag = e.target.value?.trim();
            if (tag) {
                console.log('Tag added:', tag);
                e.target.value = ''; 

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
    
    dialogElements.collectionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const collection = e.target.value?.trim();
            if (collection) {
                console.log('Collection added:', collection);
                e.target.value = ''; 

                let collectionElement = document.createElement('span');

                collectionElement.textContent = collection;
                collectionElement.classList.add('u-tag');

                collectionElement.style.backgroundColor = tagColors[collection[0].toUpperCase()]?.background || '#E0E0E0';
                collectionElement.style.color = tagColors[collection[0].toUpperCase()]?.color || '#000000';
                collectionElement.style.borderColor = tagColors[collection[0].toUpperCase()]?.border || '#E0E0E0';

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
            let res = await bookmarkHandler.addNewBookmark({ title, url, tags: tagNames, collections: collectionNames, createdAt: new Date().toISOString()});
            console.log(res);
            if(res){
                dialogElements.form.reset();
                dialogElements.tagList.replaceChildren();
                dialogElements.collectionList.replaceChildren();
                dialogElements.dialog.close();
                dialogElements.confirm.disabled = false;
            }
        }   else {
            alert('Please fill in both Title and URL fields.');
        }
    });
}

export { addDialogEvents };