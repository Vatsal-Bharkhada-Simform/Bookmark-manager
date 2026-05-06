// Populated at runtime once bookmarks are fetched

const collections = {
    name: "",
    bookmarks: []
};

const collectionTableTemplate = {
    title: {
        th_title: "Name",
        type: "text",
    },
    url: {
        th_title: "URL",
        type: "hyperlink",
    },
    tags: {
        th_title: "Tags",
        type: "tags",
    },
    visits: {
        th_title: "Visits",
        type: "visits",
    },
    delete: {
        th_title: "",
        type: "delete_button"
    }
};

export { collections, collectionTableTemplate };
