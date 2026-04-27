// This is the basic structure which will be followed to store bookmark entry in IndexedDB database.

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

const bookmarkTemplate = {
    checkbox: "selection",
    title: "text",
    url: "hyperlink",
    collections: "tags",
    tags: "tags",
    visits: "visits",
}

export { bookmark, bookmarkTemplate };
