import { getAllBookmarks } from "./controllers/bookmark.controller.js";
import { initDB } from "./controllers/db.controller.js";
// let data = null;

async function connectDB(){
    await initDB();
    let data = await getAllBookmarks();
    console.log(data);
}

connectDB();
