function isValidUrl(url){
    if(url.split("//").length !== 2) return false;

    let urlInstance = new URL(url);
    if(!urlInstance.hostname) return false;
    const validProtocols = ['http:', 'https:'];

    return (urlInstance.protocol && validProtocols.includes(urlInstance.protocol));
}

function isValidText(input){
    return /^(?=.*\p{L}).+$/u.test(input);
}

function isValidForm(title, url){
    if(title && !isValidText(title)){
        alert("Please provide a proper name.");
        return false;
    }
    if(url && !isValidUrl(url)){
        alert("Please provide a proper URL.");
        return false;
    }
    return true;
}

export {isValidText, isValidUrl, isValidForm};
