import { addBookmark, deleteBookmark, getAllBookmarks, updateBookmark } from "../controllers/bookmark.controller.js"
import { bookmarkTemplate } from "../models/bookmark.model.js";
import { domElements } from "../views/domElements.js";
import { generateTable } from "../views/generateElements.js";
import { collectionHandler } from "./collectionHandler.js";

const bookmarkHandler = {
    allBookmarks: [],
    bookmarksToDisplay: [],
    selectedBookmarks: [],
    mode: {
        for: "",
        type: ""
    },
    debounceTimer: null,
    get bookmarks() {
        return this.bookmarksToDisplay;
    },
    set bookmarks(data) {
        this.bookmarksToDisplay = data;
        this.selectedBookmarks = [];
        this.loadBookmarks();
        collectionHandler.populateCollections();
    },
    getBookmark(id) {
        return this.allBookmarks.find(bookmark => bookmark.id === id);
    },
    async populateBookmarks() {
        this.allBookmarks = await getAllBookmarks();
        this.bookmarks = [...this.allBookmarks];
        this.mode.for = "";
        this.mode.type = "";
    },
    loadBookmarks() {
        // Clear table
        domElements.bookmarkTableContainer.replaceChildren();

        // Generate new table
        let table = generateTable(this.bookmarks, bookmarkTemplate, true);

        // Insert table
        domElements.bookmarkTableContainer.append(table);
    },
    async addNewBookmark(bookmarkData) {
        return addBookmark(bookmarkData)
        .then(() => {
            this.populateBookmarks();
            this.mode.for = "";
            this.mode.type = "";
            return true;
        })
        .catch(err => {
            alert('Error adding bookmark!');
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
            alert('Error updating bookmark!');
            console.error('Error updating bookmark:', err);
            return false;
        });
    },
    incrementVisitCount(id) {
        let bookmark = this.getBookmark(id);
        bookmark.visits = +(bookmark.visits || 0) + 1;
        this.editBookmark(bookmark);
    },
    toggleSelectedBookmark(id) {
        // If bookmark already selected, remove it else add it.
        if (this.selectedBookmarks.find(b_id => b_id === id)) {
            this.selectedBookmarks = this.selectedBookmarks.filter(b_id => b_id !== id);
        } else {
            this.selectedBookmarks.push(id);
        }

        // Show delete button if a bookmark is selected.
        if (this.selectedBookmarks.length) {
            domElements.deleteButton.style.display = 'inline-block';
        } else {
            domElements.deleteButton.style.display = 'none';
        }
    },
    deleteSelectedBookmark() {
        let deletePromises = [];

        // Delete bookmarks one by one
        this.selectedBookmarks.forEach(id => {
            deletePromises.push(deleteBookmark(id));
        });

        // Raise error if any request fails.
        Promise.all(deletePromises)
            .then(() => {
                this.populateBookmarks();
                domElements.deleteButton.style.display = 'none';
            })
            .catch(err => {
                alert('Error deleting bookmark!');
                console.error('Error deleting bookmark:', err);
            });
    },
    searchBookmarks(query) {
        // Remove previous debounced request if not executed
        clearTimeout(this.debounceTimer);

        //Prevent search for empty queries
        if (!query) {
            if(this.bookmarks.length !== this.allBookmarks.length){
                this .bookmarks = [...this.allBookmarks];
            }
            return;
        }

        // Add debounced search query
        this.debounceTimer = setTimeout(() => {
            this.handleSearch(query);
        }, 400);
    },
    handleSearch(query) {
        query = query.toLowerCase();

        // If filter exists, use search query for filtering.
        if(this.mode.for === "FILTER"){
            this.handleFilter(query);
            return;
        }
        
        // Search through entire array of bookmarks for the result.
        this.bookmarks = this.allBookmarks.filter(bookmark => {
            return bookmark.title.toLowerCase().includes(query) ||
                bookmark.url.toLowerCase().includes(query) ||
                (bookmark.tags && bookmark.tags.some(tag => tag.toLowerCase().includes(query))) ||
                (bookmark.collections && bookmark.collections.some(collection => collection.toLowerCase().includes(query)));
        });
    },
    handleFilterAndSort(query = "") {
        // Extract mode configuration
        let [mode_for, mode_type] = query.split("_");

        // If same mode clicked again, disable it
        if(this.mode.for === mode_for && this.mode.type === mode_type){
            this.populateBookmarks();
            return false;
        }

        // Update current mode
        this.mode.for = mode_for;
        this.mode.type = mode_type;

        // Apply sort instantaneously
        if(mode_for === "SORT") this.handleSort();

        return true;
    },
    handleFilter(query) {
        switch (this.mode.type) {
            case "NAME":
                this.bookmarks = this.allBookmarks.filter(bookmark => {
                    return bookmark.title.toLowerCase().includes(query)
                })
                break;

            case "URL":
                this.bookmarks = this.allBookmarks.filter(bookmark => {
                    return bookmark.url.toLowerCase().includes(query)
                })
                break;
        }
    },
    handleSort() {
        switch (this.mode.type) {
            case "NAME":
                this.bookmarks = this.bookmarks.sort((b1, b2) => String(b1.title).localeCompare(String(b2.title)));
                break;

            case "URL":
                this.bookmarks = this.bookmarks.sort((b1, b2) => String(b1.url).localeCompare(String(b2.url)));
                break;
            
            case "DATE":
                this.bookmarks = this.bookmarks.sort((b1, b2) => (Date.parse(b1.createdAt) > Date.parse(b2.createdAt)) ? -1 : 1);
                break;
        }
    }
}

export { bookmarkHandler };