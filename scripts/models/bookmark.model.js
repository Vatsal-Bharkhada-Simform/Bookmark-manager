// This is the basic structure which will be followed to store bookmark entry in IndexedDB database.
export const EXPIRY_RANGE = (1000*60*60*24*60);

const bookmark = {
    title: "",
    url: "",
    collections: [],
    tags: [],
    profile: "",
    createdAt: "",
    deletedAt: "",
    visits: 0
}

// Template for table of bookmarks containing column headers and data format to generate specific elements dynamically
const bookmarkTemplate = {
    checkbox: {
        th_title: "",
        type: "selection",
    },
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
    collections: {
        th_title: "Collections",
        type: "tags",
    },
    visits: {
        th_title: "Visits",
        type: "visits",
    },
}

export { bookmark, bookmarkTemplate };
