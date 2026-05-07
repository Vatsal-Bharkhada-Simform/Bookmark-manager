import { generateIconElement, generateTagElement } from "../views/generateElements.js";
import { bookmarkHandler } from "./bookmarkHandler.js";

const insertionHandler = {
    // Root function which manages insertion based on the type of node
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
            case 'delete_button':
                return insertionHandler.insertDeleteButton(id);
            default:
                return insertionHandler.insertText(data);
        }
    },
    // Function to create hyperlinks
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
    // Function to create tag list from array of tag names
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
    // Function to create element showing visit counts
    insertVisits: (visits) => {
        let span = document.createElement('span');
        span.textContent = visits || '0';
        return span;
    },
    // Inserts delete button with metadata stored as dataset attributes
    insertDeleteButton: (id) => {
        let delButton = document.createElement('button');
        let delIcon = generateIconElement('trash-bin');
        delButton.append(delIcon);
        delButton.classList.add("button-danger-ghost");
        delButton.dataset.type = "DELETE";
        delButton.dataset.id = id;
        return delButton;
    },
    // For regular text
    insertText: (text) => {
        let span = document.createElement('span');
        span.textContent = text;
        return span;
    },
    // Insert checkbox to mark bookmark as selected when checked
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
    // Insert edit button with metadata stored in dataset attributes
    insertEditButton: (tr, bookmark) => {
        let container = document.createElement("div");
        container.classList.add("edit-container");
        container.append(tr.innerText);
        tr.innerText = "";
        
        let editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.appendChild(generateIconElement('edit'));
        editButton.classList.add('button-secondary');
        editButton.classList.add('button-edit');
        editButton.dataset.id = bookmark?.id;
        editButton.dataset.type = 'edit';

        container.append(editButton);
        
        tr.appendChild(container);
    }
}

export { insertionHandler };