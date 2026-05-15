const domElements = {
    sidebar: document.querySelector('#sidebar-container'),

    bookmarkTableContainer: document.querySelector(".table__wrapper.bookmark-table"),
    
    deleteButton: document.querySelector('#btn-delete-bookmark'),
    bookmarkSearch: document.querySelector('#bookmark-search'),
    bookmarkSearchForm: document.querySelector('.head__search'),
    filterDropdown: document.querySelector("#dropdown__filter"),
    sortDropdown: document.querySelector("#dropdown__sort"),
    
    collectionContainer: document.querySelector(".content__body.collection__content"),

    deletedBookmarkTableContainer: document.querySelector(".table__wrapper.deleted-table"),
    deleteAllButton: document.querySelector("#btn-permanently-delete"),
    restoreAllButton: document.querySelector("#btn-restore-all"),
}

export { domElements };