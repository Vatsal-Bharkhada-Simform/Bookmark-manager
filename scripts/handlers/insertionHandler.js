import { generateIconElement, generateTagElement } from "../views/generateElements.js";
import { bookmarkHandler } from "./bookmarkHandler.js";

const insertionHandler = {
    insertData: (data, type, id) => {
        switch (type) {
            case 'selection':
                return insertionHandler.insertSelectBox(id);
            case 'hyperlink':
                return insertionHandler.insertHyperlink(data, id);
            case 'tags':
                return insertionHandler.insertTagList(data);
            case 'visits':
                return insertionHandler.insertVisits(data);
            default:
                return insertionHandler.insertText(data);
        }
    },
    insertHyperlink: (url, id) => {
        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url;
        }
        let a = document.createElement('a');
        a.href = url;
        a.textContent = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.onclick = () => {
            bookmarkHandler.incrementVisitCount(id);
        }
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
    },
    insertSelectBox: (id) => {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.title = "Select";
        checkbox.checked = false;
        checkbox.classList.add("input-checkbox");
        checkbox.onchange = () => {
            bookmarkHandler.toggleSelectedBookmark(+id);
        }
        return checkbox;
    },
    insertEditButton: (tr, bookmark) => {
        let editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.appendChild(generateIconElement('edit'));
        editButton.classList.add('button-secondary');
        editButton.classList.add('button-edit');
        editButton.dataset.id = bookmark?.id;
        editButton.dataset.type = 'edit';
        tr.appendChild(editButton);
    }
}

export { insertionHandler };