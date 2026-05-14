import { initDB } from "./controllers/db.controller.js";
import { addBookmarkEvents } from "./events/addBookmarkEvents.js";
import { addCollectionEvents } from "./events/addCollectionEvents.js";
import { addDialogEvents } from "./events/addDialogEvents.js";
import { addNavigationEvents } from "./events/addNavigationEvents.js";
import { bookmarkHandler } from "./handlers/bookmarkHandler.js";

async function connectDB() {
    try {
        await initDB();
    } catch (err) {
        console.log("Error while connecting to database: ", err);
        return;
    }

    try{
        await bookmarkHandler.populateBookmarks();
    } catch (err) {
        console.log("Error in loading bookmarks.", err);
    }
}

await connectDB();

addBookmarkEvents();
addDialogEvents();
addNavigationEvents();
addCollectionEvents();