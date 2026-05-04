let db = null;

export async function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("BookmarkDB", 1);

        request.onupgradeneeded = (event) => {
            // Use temp_db because event.target.result is not available until onsuccess
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
    });
}

/**
 * Get an IndexedDB object store
 * @param {string} name - Store name
 * @param {'readonly' | 'readwrite'} [mode='readonly'] - Transaction mode
 * @returns {IDBObjectStore}
 */
export function getStore(name, mode = "readonly") {
    if (!db) {
        throw new Error("Database not initialized. Call initDB() first.");
    }
    const tx = db.transaction(name, mode);
    return tx.objectStore(name);
}
