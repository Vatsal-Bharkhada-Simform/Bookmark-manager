import { getAllBookmarks } from "../controllers/bookmark.controller.js"
import { bookmarkTemplate } from "../models/bookmark.model.js";
import tagColors from "../views/tagColors.js";
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
    async populateBookmarks(){
        this.allBookmarks = await getAllBookmarks();
        this.bookmarks = [...this.allBookmarks];
        // this.loadBookmarks();
        return this.bookmarks;
    },
    loadBookmarks(){
        console.log('Bookmarks loaded:', this.bookmarks);
        this.bookmarks.forEach(bookmark => {
            console.log('Bookmark:', bookmark);
            let tr = document.createElement('tr');
            this.displayProperties.forEach(prop => {
                let td = document.createElement('td');
                let element = insertionHandler.insertData(bookmark[prop], bookmarkTemplate[prop]);
                td.appendChild(element);
                tr.appendChild(td);
            });
            document.querySelector('.table__body').appendChild(tr);
        });
    },
}

export { bookmarkHandler };