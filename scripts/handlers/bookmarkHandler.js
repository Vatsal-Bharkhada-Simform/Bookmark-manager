import { addBookmark, deleteBookmark, getAllBookmarks, updateBookmark } from "../controllers/bookmark.controller.js"
import { bookmarkTemplate } from "../models/bookmark.model.js";
import { domElements } from "../views/domElements.js";
import { generateIconElement } from "../views/generateElements.js";
import { insertionHandler } from "./insertionHandler.js";

const bookmarkHandler = {
    allBookmarks: [],
    bookmarksToDisplay: [],
    selectedBookmarks: [],
    displayProperties: ['checkbox', 'title', 'url', 'tags', 'collections', 'visits'],
    debounceTimer: null,
    get bookmarks() {
        return this.bookmarksToDisplay;
    },
    set bookmarks(data) {
        this.bookmarksToDisplay = data;
        this.selectedBookmarks = [];
        this.loadBookmarks();
    },
    getBookmark(id) {
        return this.allBookmarks.find(bookmark => bookmark.id === id);
    },
    async populateBookmarks() {
        this.allBookmarks = await getAllBookmarks();
        this.bookmarks = [...this.allBookmarks];
    },
    loadBookmarks() {
        domElements.tableBody.replaceChildren();
        this.bookmarks.forEach(bookmark => {
            let tr = document.createElement('tr');
            this.displayProperties.forEach(prop => {
                let td = document.createElement('td');
                let element = insertionHandler.insertData(bookmark[prop], bookmarkTemplate[prop], +bookmark.id);
                td.appendChild(element);
                tr.appendChild(td);
            });

            let editButton = document.createElement('button');
            editButton.textContent = "Edit";
            editButton.appendChild(generateIconElement('edit'));
            editButton.classList.add('button-secondary');
            editButton.classList.add('button-edit');
            editButton.dataset.id = bookmark?.id;
            editButton.dataset.type = 'edit';
            tr.appendChild(editButton);

            domElements.tableBody.appendChild(tr);
        });
    },
    async addNewBookmark(bookmarkData) {
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
    async editBookmark(bookmarkData) {
        return updateBookmark(bookmarkData)
            .then(() => {
                this.populateBookmarks();
                return true;
            })
            .catch(err => {
                console.error('Error adding bookmark:', err);
                return false;
            });
    },
    incrementVisitCount(id) {
        let bookmark = this.getBookmark(id);
        console.log(bookmark);
        bookmark.visits = +(bookmark.visits || 0) + 1;
        this.editBookmark(bookmark);
    },
    toggleSelectedBookmark(id) {
        if (this.selectedBookmarks.find(b_id => b_id === id)) {
            this.selectedBookmarks = this.selectedBookmarks.filter(b_id => b_id !== id);
        } else {
            this.selectedBookmarks.push(id);
        }
        if (this.selectedBookmarks.length) {
            domElements.deleteButton.style.display = 'inline-block';
        } else {
            domElements.deleteButton.style.display = 'none';
        }
    },
    deleteSelectedBookmark() {
        this.selectedBookmarks.forEach(id => {
            deleteBookmark(id);
        })
        this.populateBookmarks();
    },
    searchBookmarks(query) {
        clearTimeout(this.debounceTimer);
        if (!query) {
            this.bookmarks = [...this.allBookmarks];
            return;
        }
        this.debounceTimer = setTimeout(() => {
            query = query.toLowerCase();
            this.bookmarks = this.allBookmarks.filter(bookmark => {
                return bookmark.title.toLowerCase().includes(query) ||
                    bookmark.url.toLowerCase().includes(query) ||
                    (bookmark.tags && bookmark.tags.some(tag => tag.toLowerCase().includes(query))) ||
                    (bookmark.collections && bookmark.collections.some(collection => collection.toLowerCase().includes(query)));
            });
        }, 400);
    }
}

export { bookmarkHandler };