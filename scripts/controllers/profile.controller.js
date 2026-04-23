import getRequestPromise from "../utils/getRequestPromise.js";
import { getStore } from "./db.controller.js";

const STORE = "profile";

function addProfile(profile){
    const profileStore = getStore(STORE, "readwrite");
    return getRequestPromise(profileStore.add(profile));
}

function getAllProfiles() {
    const profileStore = getStore(STORE, "readonly");
    return getRequestPromise(profileStore.getAll());
}

function getProfileById(id) {
    const profileStore = getStore(STORE, "readonly");
    return getRequestPromise(profileStore.get(id));
}

function updateProfile(profile) {
    const profileStore = getStore(STORE, "readwrite");
    return getRequestPromise(profileStore.put(profile));
}

function deleteProfile(id) {
    const profileStore = getStore(STORE, "readwrite");
    return getRequestPromise(profileStore.delete(id));
}

export { addProfile, getProfileById, getAllProfiles, updateProfile, deleteProfile };