import getRequestPromise from "../utils/getRequestPromise.js";
import { getStore } from "./db.controller.js";

const STORE = "bookmark";

function addBookmark(bookmark){
    const bookmarkStore = getStore(STORE, "readwrite");
    return getRequestPromise(bookmarkStore.add(bookmark));
}

function getAllBookmarks() {
    const bookmarkStore = getStore(STORE, "readonly");
    return getRequestPromise(bookmarkStore.getAll());
}

function getBookmarkById(id) {
    const bookmarkStore = getStore(STORE, "readonly");
    return getRequestPromise(bookmarkStore.get(id));
}

function updateBookmark(bookmark) {
    const bookmarkStore = getStore(STORE, "readwrite");
    return getRequestPromise(bookmarkStore.put(bookmark));
}

function deleteBookmark(id) {
    const bookmarkStore = getStore(STORE, "readwrite");
    return getRequestPromise(bookmarkStore.delete(id));
}

export {addBookmark, getAllBookmarks, getBookmarkById, updateBookmark, deleteBookmark};
