import { getStore } from "./db.controller.js";

function addBookmark(bookmark){
    const bookmarkStore = getStore("bookmark", "readwrite");

    return new Promise((resolve, reject) => {
        let req = bookmarkStore.add(bookmark);

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    })
}

function getAllBookmarks() {
    const bookmarkStore = getStore("bookmark", "readonly");

    return new Promise((resolve, reject) => {
        const req = bookmarkStore.getAll();

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

function getBookmarkById(id) {
    const bookmarkStore = getStore("bookmark", "readonly");

    return new Promise((resolve, reject) => {
        const req = bookmarkStore.get(id);

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

function updateBookmark(bookmark) {
    const bookmarkStore = getStore("bookmark", "readonly");

    return new Promise((resolve, reject) => {
        const req = bookmarkStore.put(bookmark);

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

function deleteBookmark(id) {
    const bookmarkStore = getStore("bookmark", "readonly");

    return new Promise((resolve, reject) => {
        const req = bookmarkStore.delete(id);

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export {addBookmark, getAllBookmarks, getBookmarkById, updateBookmark, deleteBookmark};