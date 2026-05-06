import { initDB } from "./controllers/db.controller.js";
import { addBookmarkEvents } from "./events/addBookmarkEvents.js";
import { addDialogEvents } from "./events/addDialogEvents.js";
import { addNavigationEvents } from "./events/addNavigationEvents.js";
import { bookmarkHandler } from "./handlers/bookmarkHandler.js";
import { collectionHandler } from "./handlers/collectionHandler.js";

async function connectDB() {
    try {
        await initDB();
    } catch (err) {
        console.log("Error while connecting to database: ", err);
        return;
    }

    try{
        await bookmarkHandler.populateBookmarks();
        collectionHandler.populateCollections();
    } catch (err) {
        console.log("Error in loading bookmarks.", err);
    }
}

await connectDB();

addBookmarkEvents();
addDialogEvents();
addNavigationEvents();