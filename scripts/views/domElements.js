const domElements = {
    sidebar: document.querySelector('#sidebar-container'),

    allBookmarksHead: document.querySelector("#all-bookmarks .head__options"),
    bookmarkTableContainer: document.querySelector(".table__wrapper.bookmark-table"),
    
    deleteButton: document.querySelector('#btn-delete-bookmark'),
    bookmarkSearch: document.querySelector('#bookmark-search'),
    bookmarkSearchForm: document.querySelector('.head__search'),
    filterDropdown: document.querySelector("#dropdown__filter"),
    sortDropdown: document.querySelector("#dropdown__sort"),
    
    collectionContainer: document.querySelector(".content__body.collection__content"),

    deletedBookmarksHead: document.querySelector("#deleted-bookmarks .head__options"),
    deletedBookmarkTableContainer: document.querySelector(".table__wrapper.deleted-table"),
    deleteAllButton: document.querySelector("#btn-permanently-delete"),
    restoreAllButton: document.querySelector("#btn-restore-all"),
}

export { domElements };