import getRequestPromise from "../utils/getRequestPromise.js";
import { getStore } from "./db.controller.js";

const STORE = "profile";

function addProfile(profile){
    try {
        const profileStore = getStore(STORE, "readwrite");
        return getRequestPromise(profileStore.add(profile));
    } catch (err) {
        console.log("Error while executing operaion: ", err);
    }
}

function getAllProfiles() {
    try {
        const profileStore = getStore(STORE, "readonly");
        return getRequestPromise(profileStore.getAll());
    } catch (err) {
        console.log("Error while executing operaion: ", err);
    }
}

function getProfileById(id) {
    try {
        const profileStore = getStore(STORE, "readonly");
        return getRequestPromise(profileStore.get(id));
    } catch (err) {
        console.log("Error while executing operaion: ", err);
    }
}

function updateProfile(profile) {
    try {
        const profileStore = getStore(STORE, "readwrite");
        return getRequestPromise(profileStore.put(profile));
    } catch (err) {
        console.log("Error while executing operaion: ", err);
    }
}

function deleteProfile(id) {
    try {
        const profileStore = getStore(STORE, "readwrite");
        return getRequestPromise(profileStore.delete(id));
    } catch (err) {
        console.log("Error while executing operaion: ", err);
    }
}

export { addProfile, getProfileById, getAllProfiles, updateProfile, deleteProfile };
