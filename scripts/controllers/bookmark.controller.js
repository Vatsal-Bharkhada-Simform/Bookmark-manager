import getRequestPromise from "../utils/getRequestPromise.js";
import { getStore } from "./db.controller.js";

const STORE = "bookmark";

function addBookmark(bookmark){
    try {
        const bookmarkStore = getStore(STORE, "readwrite");
        return getRequestPromise(bookmarkStore.add(bookmark));
    } catch (err) {
        console.log("Error while executing operation: ", err);
    }
}

function getAllBookmarks() {
    try {
        const bookmarkStore = getStore(STORE, "readonly");
        return getRequestPromise(bookmarkStore.getAll());
    } catch (err) {
        console.log("Error while executing operation: ", err);
    }
}

function getBookmarkById(id) {
    try {
        const bookmarkStore = getStore(STORE, "readonly");
        return getRequestPromise(bookmarkStore.get(id));
    } catch (err) {
        console.log("Error while executing operation: ", err);
    }
}

function updateBookmark(bookmark) {
    try {
        const bookmarkStore = getStore(STORE, "readwrite");
        return getRequestPromise(bookmarkStore.put(bookmark));
    } catch (err) {
        console.log("Error while executing operation: ", err);
    }
}

function deleteBookmark(id) {
    try {
        const bookmarkStore = getStore(STORE, "readwrite");
        return getRequestPromise(bookmarkStore.delete(id));
    } catch (err) {
        console.log("Error while executing operation: ", err);
    }
}

export {addBookmark, getAllBookmarks, getBookmarkById, updateBookmark, deleteBookmark};
