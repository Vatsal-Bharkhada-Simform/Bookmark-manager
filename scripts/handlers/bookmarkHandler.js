import { addBookmark, getAllBookmarks, updateBookmark } from "../controllers/bookmark.controller.js"
import { bookmarkTemplate } from "../models/bookmark.model.js";
import { domElements } from "../views/domElements.js";
import { generateIconElement } from "../views/generateElements.js";
import { insertionHandler } from "./insertionHandler.js";

const bookmarkHandler = {
    allBookmarks: [],
    bookmarksToDisplay: [],
    displayProperties: ['title', 'url', 'tags', 'collections', 'visits'],
    get bookmarks(){
        return this.bookmarksToDisplay;
    },
    set bookmarks(data){
        this.bookmarksToDisplay = data;
        this.loadBookmarks();
    },
    getBookmark(id){
        return this.allBookmarks.find(bookmark => bookmark.id === id);
    },
    async populateBookmarks(){
        this.allBookmarks = await getAllBookmarks();
        this.bookmarks = [...this.allBookmarks];
    },
    loadBookmarks(){
        domElements.tableBody.replaceChildren();
        this.bookmarks.forEach(bookmark => {
            let tr = document.createElement('tr');
            this.displayProperties.forEach(prop => {
                let td = document.createElement('td');
                let element = insertionHandler.insertData(bookmark[prop], bookmarkTemplate[prop]);
                td.appendChild(element);
                tr.appendChild(td);
            });

            let editButton = document.createElement('button');
            editButton.appendChild(generateIconElement('edit'));
            editButton.classList.add('button-ghost');
            editButton.classList.add('button-edit');
            editButton.dataset.id = bookmark?.id;
            editButton.dataset.type = 'edit';
            tr.appendChild(editButton);
            
            domElements.tableBody.appendChild(tr);
        });
    },
    async addNewBookmark(bookmarkData){
        return addBookmark(bookmarkData)
        .then(() => {
            this.populateBookmarks();
            return true;
        })
        .catch(err => {
            console.error('Error adding bookmark:', err);
            return false;
        });
    },
    async editBookmark(bookmarkData){
        return updateBookmark(bookmarkData)
        .then(() => {
            this.populateBookmarks();
            return true;
        })
        .catch(err => {
            console.error('Error adding bookmark:', err);
            return false;
        });
    }
}

export { bookmarkHandler };