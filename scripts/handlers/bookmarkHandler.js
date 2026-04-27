import { getAllBookmarks } from "../controllers/bookmark.controller.js"
import tagColors from "../views/tagColors.js";

const bookmarkHandler = {
    bookmarks: [],
    bookmarksToDisplay: [],
    displayProperties: ['title', 'url', 'tags', 'collections', 'visits'],
    async populateBookmarks(){
        this.bookmarks = await getAllBookmarks();
        this.bookmarksToDisplay = [...this.bookmarks];
        this.loadBookmarks();
        return this.bookmarks;
    },
    loadBookmarks(){
        console.log('Bookmarks loaded:', this.bookmarksToDisplay);
        this.bookmarksToDisplay.forEach(bookmark => {
            console.log('Bookmark:', bookmark);
            let tr = document.createElement('tr');
            this.displayProperties.forEach(prop => {
                let td = document.createElement('td');
                if(Array.isArray(bookmark[prop])){
                    bookmark[prop].forEach(item => {
                        let span = document.createElement('span');
                        span.textContent = item;
                        span.classList.add('u-tag');

                        span.style.backgroundColor = tagColors[item[0].toUpperCase()]?.background || '#E0E0E0';
                        span.style.color = tagColors[item[0].toUpperCase()]?.color || '#000000';
                        span.style.borderColor = tagColors[item[0].toUpperCase()]?.border || '#E0E0E0';

                        td.classList.add('tag-container');
                        td.appendChild(span);
                    });
                } else {
                    if(prop === "visits" && !bookmark[prop]){
                        td.textContent = '0';
                    } else {
                        td.textContent = bookmark[prop];
                    }
                }
                tr.appendChild(td);
            });
            document.querySelector('.table__body').appendChild(tr);
        });
    }
}

export { bookmarkHandler };