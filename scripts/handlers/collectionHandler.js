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
        console.log("Loaded collections");
    },
}

export {collectionHandler};