import { domElements } from "../views/domElements.js";
import { bookmarkHandler } from "./bookmarkHandler.js";

const collectionHandler = {
    _collections: [],
    get collections(){
        return this._collections;
    },
    set collections(data){
        this._collections = data;
        this.loadCollections();
    },
    populateCollections(){
        let bookmarks = bookmarkHandler.bookmarks;
        let groupedBookmarks = bookmarks.reduce((acc, bookmark) => {
            bookmark.collections.forEach((collection) => {
                if(acc[collection]){
                    acc[collection].push(bookmark);
                } else {
                    acc[collection] = [bookmark];
                }
            })
            return acc;
        }, {});
        this.collections = groupedBookmarks;
    },
    loadCollections(){
        let wrapper = document.createElement("div");
        Object.keys(this.collections).forEach((key) => {
            let span = document.createElement("span");
            span.append(key);
            wrapper.append(span);
        })
        domElements.collectionContainer.append(wrapper);
    },
}

export {collectionHandler};