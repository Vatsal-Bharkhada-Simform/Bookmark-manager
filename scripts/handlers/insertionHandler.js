import { generateTagElement } from "../views/generateElements.js";

const insertionHandler = {
    insertData: (data, type) => {
        switch (type) {
            case 'hyperlink':
                return insertionHandler.insertHyperlink(data);
            case 'tags':
                return insertionHandler.insertTagList(data);
            case 'visits':
                return insertionHandler.insertVisits(data);
            default:
                return insertionHandler.insertText(data);
        }
    },
    insertHyperlink: (url) => {
        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url;
        }
        let a = document.createElement('a');
        a.href = url;
        a.textContent = url;
        a.target = '_blank';
        return a;
    },
    insertTagList: (tags) => {
        if(!Array.isArray(tags) || tags.length === 0) return document.createTextNode('');
        let wrapper = document.createElement('div');
        wrapper.classList.add('tag-list');
        tags.forEach(item => {
            let tag = generateTagElement(item);
            wrapper.appendChild(tag);
        });
        return wrapper;
    },
    insertVisits: (visits) => {
        let span = document.createElement('span');
        span.textContent = visits || '0';
        return span;
    },
    insertText: (text) => {
        let span = document.createElement('span');
        span.textContent = text;
        return span;
    }
}

export { insertionHandler };