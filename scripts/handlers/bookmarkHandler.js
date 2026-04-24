import { getAllBookmarks } from "../controllers/bookmark.controller"

const bookmarkHandler = {
    bookmarks: [],
    async populateBookmarks(){
        this.bookmarks = await getAllBookmarks();
        return this.bookmarks;
    },
    loadBookmarks(id){
        
    }
}