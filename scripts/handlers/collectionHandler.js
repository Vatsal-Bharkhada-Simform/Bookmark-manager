import { collectionTableTemplate } from "../models/collections.model.js";
import { domElements } from "../views/domElements.js";
import { generateCollapsible, generateEmptyStateElement, generateTable } from "../views/generateElements.js";
import { bookmarkHandler } from "./bookmarkHandler.js";

const collectionHandler = {
    _collections: {},
    get collections(){
        return this._collections;
    },
    set collections(data){
        this._collections = data;
        this.loadCollections();
    },
    populateCollections(){
        let bookmarks = bookmarkHandler.bookmarks;

        // Group bookmarks by collection names
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
        // Clear collection contents
        domElements.collectionContainer.replaceChildren();

        console.log(this.collections);
        if(!this.collections || Object.keys(this.collections).length === 0){
            console.log("Found it!");
            domElements.collectionContainer.append(generateEmptyStateElement("No collections created"));
        }
        
        // Generate new content elements
        let wrapper = document.createDocumentFragment();
        Object.keys(this.collections).forEach((key) => {
            let table = generateTable(this.collections[key], collectionTableTemplate);
            
            let tableCont = document.createElement("div");
            tableCont.append(table);

            let collapsible = generateCollapsible(key, tableCont, this.collections[key].length);
            wrapper.append(collapsible);
        });

        // Append generated content to the collection container
        domElements.collectionContainer.append(wrapper);
    },
    async removeBookmark(id, collection){
        let bookmark = bookmarkHandler.getBookmark(+id);
        bookmark.collections = bookmark.collections.filter(item => item !== collection);
        await bookmarkHandler.editBookmark(bookmark);
        this.populateCollections();
    }
}

export {collectionHandler};