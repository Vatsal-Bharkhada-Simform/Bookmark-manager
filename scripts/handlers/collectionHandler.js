import { collectionTableTemplate } from "../models/collections.model.js";
import { domElements } from "../views/domElements.js";
import { generateCollapsible, generateTable } from "../views/generateElements.js";
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
        let wrapper = document.createDocumentFragment();
        Object.keys(this.collections).forEach((key) => {
            let table = generateTable(this.collections[key], collectionTableTemplate);
            
            let tableCont = document.createElement("div");
            tableCont.append(table);

            let collapsible = generateCollapsible(key, tableCont, this.collections[key].length);
            wrapper.append(collapsible);
        })
        domElements.collectionContainer.append(wrapper);
    },
}

export {collectionHandler};