function getRequestPromise(req){
    return new Promise((resolve, reject) => {
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    })
}

export default getRequestPromise;
