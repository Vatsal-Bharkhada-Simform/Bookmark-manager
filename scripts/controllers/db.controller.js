let db = null;

export async function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("BookmarkDB", 1);

        request.onupgradeneeded = (event) => {
            const temp_db = event.target.result;

            temp_db.createObjectStore("bookmark", { keyPath: "id", autoIncrement: true });
            temp_db.createObjectStore("profile", { keyPath: "id", autoIncrement: true });
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
            console.log("Connected to Database!");
        }

        request.onerror = reject;
    })
}

export function getStore(name, mode = "readonly") {
    if(db !== null){
        const tx = db.transaction(name, mode);
        return tx.objectStore(name);
    }
}
