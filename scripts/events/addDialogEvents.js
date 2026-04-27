import { addBookmark, getAllBookmarks } from "../controllers/bookmark.controller.js";
import { dialogElements } from "../views/dialogElements.js";
import tagColors from "../views/tagColors.js";

function addDialogEvents() {
    dialogElements.btnAddBookmark.addEventListener('click', () => {
        dialogElements.dialog.showModal();
    });

    dialogElements.cancel.addEventListener('click', () => {
        dialogElements.dialog.close();
    });

    dialogElements.confirm.addEventListener('click', async () => {
        addBookmark({
            title: 'Google',
            url: 'https://www.google.com',
        });
        let data = await getAllBookmarks();
        console.log(data);
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

    dialogElements.form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(dialogElements.form);
        const title = formData.get('bookmark-title').trim();
        const url = formData.get('bookmark-url').trim();
        const collections = formData.get('bookmark-collections').split(',').map(col => col.trim()).filter(col => col);
        const tags = dialogElements.tagList.querySelectorAll('.u-tag');
        const tagNames = Array.from(tags).map(tag => tag.textContent);

        if (title && url) {
            await addBookmark({ title, url, tags: tagNames, collections });
            let data = await getAllBookmarks();
            console.log(data);
            dialogElements.dialog.close();
        }   else {
            alert('Please fill in both Title and URL fields.');
        }
    });
}

export { addDialogEvents };