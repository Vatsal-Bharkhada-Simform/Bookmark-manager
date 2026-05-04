import { getAllBookmarks } from "./controllers/bookmark.controller.js";
import { initDB } from "./controllers/db.controller.js";

async function connectDB() {
    try {
        await initDB();
    } catch (err) {
        console.log("Error while connecting to database: ", err);
        return;
    }

    let data;
    try{
        data = await getAllBookmarks();
    } catch (err) {
        console.log("Error in fetching data: ", err);
        data = [];
    }

    console.log(data);
}

connectDB();
