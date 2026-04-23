// This is the basic structure which will be followed to store bookmark entry in IndexedDB database.

const bookmark = {
    id: 0,
    title: "",
    url: "",
    collections: [],
    tags: [],
    profile: "",
    createdAt: "",
    deletedAt: "",
    visits: 0
}
const bookmark1 = {
    title: "First bookmark",
    url: "https://google.com",
    collections: ["First"],
    tags: ["General"],
    profile: "",
    createdAt: new Date(),
    deletedAt: "",
    visits: 0
}

export { bookmark };