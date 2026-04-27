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
                // Add the tag to the UI (you can create a tag element and append it to a container)
                console.log('Tag added:', tag);
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

export { addDialogEvents };