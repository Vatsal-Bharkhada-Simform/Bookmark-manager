import tagColors from "../views/tagColors.js";

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
            let span = document.createElement('span');
            span.textContent = item;
            span.classList.add('u-tag');
            span.style.backgroundColor = tagColors[item[0].toUpperCase()]?.background || '#E0E0E0';
            span.style.color = tagColors[item[0].toUpperCase()]?.color || '#000000';
            span.style.borderColor = tagColors[item[0].toUpperCase()]?.border || '#E0E0E0';
            wrapper.appendChild(span);
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