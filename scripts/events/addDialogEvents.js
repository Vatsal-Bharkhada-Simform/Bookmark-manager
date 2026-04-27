import { dialogElements } from "../views/dialogElements.js";

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
}

export { addDialogEvents };