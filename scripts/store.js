const bookmarks = [];
let adding = false;
let edit = false;
let editBookmark;
let error = null;
let filter = 0;

const addBookmarkToUIStoreDatabase = function (data) {
    data.forEach(bookmark => {
        bookmark['expand'] = false;
        this.bookmarks.push(bookmark);
    });
};

const editBookmarkInUIStoreDatabase = function (currentTargetBookmark, editedBookmark) {
    Object.assign(currentTargetBookmark, editedBookmark)
}

// Should I break this function down further?

const removeBookmarkFromUIStoreDatabase = function(currentTargetBookmark) {
    const currentTargetBookmarkIndex = this.bookmarks.findIndex(bookmark => bookmark == currentTargetBookmark);
    this.bookmarks.splice(currentTargetBookmarkIndex, 1);
};

const findCurrentBookmarkByID = function (bookmarkID) {
    return this.bookmarks.find(bookmark => bookmark.id == bookmarkID);
};

const toggleProperty = function (object, property) {
    object[property] = !object[property];
};

export default {
    bookmarks,
    adding,
    edit,
    editBookmark,
    error,
    filter,
    addBookmarkToUIStoreDatabase,
    editBookmarkInUIStoreDatabase,
    removeBookmarkFromUIStoreDatabase,
    findCurrentBookmarkByID,
    toggleProperty
}