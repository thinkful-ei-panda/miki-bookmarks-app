const bookmarks = [];
let adding = false;
// let edit = false;
let error = null;
let filter = 0;

const addBookmarkToUIStoreDatabase = function (data) {
    data.forEach(bookmark => {
        bookmark['expand'] = false;
        bookmark['edit'] = false;
        this.bookmarks.push(bookmark);
    });
};

const editBookmarkInUIStoreDatabase = function (currentTargetBookmark, editedBookmark) {
    Object.assign(currentTargetBookmark, editedBookmark)
}

const removeBookmarkFromUIStoreDatabase = function(currentTargetBookmark) {
    const currentTargetBookmarkIndex = this.bookmarks.findIndex(bookmark => bookmark == currentTargetBookmark);
    this.bookmarks.splice(currentTargetBookmarkIndex, 1);
};

const findCurrentBookmarkByID = function (bookmarkID) {
    return this.bookmarks.find(bookmark => bookmark.id == bookmarkID);
};

const toggleBookmarkProperty = function (object, property) {
    object[property] = !object[property];
};

const toggleStoreProperty = function (property) {
    this[property] = !this[property];
};

export default {
    bookmarks,
    adding,
    // edit,
    error,
    filter,
    addBookmarkToUIStoreDatabase,
    editBookmarkInUIStoreDatabase,
    removeBookmarkFromUIStoreDatabase,
    findCurrentBookmarkByID,
    toggleBookmarkProperty,
    toggleStoreProperty
}