import { initDB } from "./controllers/db.controller.js";
import { addDialogEvents } from "./events/addDialogEvents.js";
import { bookmarkHandler } from "./handlers/bookmarkHandler.js";

async function connectDB() {
    try {
        await initDB();
    } catch (err) {
        console.log("Error while connecting to database: ", err);
        return;
    }

    let data;
    try{
        data = await bookmarkHandler.populateBookmarks();
    } catch (err) {
        console.log("Error in fetching data: ", err);
        data = [];
    }

    console.log(data);
}

await connectDB();

addDialogEvents();