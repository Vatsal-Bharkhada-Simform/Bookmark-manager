import { getStore } from "./db.controller";

function addProfile(profile){
    const profileStore = getStore("profile", "readwrite");

    return new Promise((resolve, reject) => {
        let req = profileStore.add(profile);

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    })
}

function getAllProfiles() {
    const profileStore = getStore("profile", "readonly");

    return new Promise((resolve, reject) => {
        const req = profileStore.getAll();

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

function getProfileById(id) {
    const profileStore = getStore("profile", "readonly");
    
    return new Promise((resolve, reject) => {
        const req = profileStore.get(id);
        
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

function updateProfile(profile) {
    const profileStore = getStore("profile", "readwrite");

    return new Promise((resolve, reject) => {
        const req = profileStore.put(profile);

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

function deleteProfile(id) {
    const profileStore = getStore("profile", "readwrite");

    return new Promise((resolve, reject) => {
        const req = profileStore.delete(id);

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export { addProfile, getProfileById, getAllProfiles, updateProfile, deleteProfile };