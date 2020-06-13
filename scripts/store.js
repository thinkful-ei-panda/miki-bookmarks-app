const bookmarks = [];
let adding = false;
let edit = false;
let error = null;
let filter = 0;

const addDataToUIStoreDatabase = function (data) {
    data.forEach(bookmark => {
        bookmark['expand'] = false;
        bookmark['edit'] = false;
        this.bookmarks.push(bookmark);
    });
}

const deleteCurrentTargetBookmark = function(currentTargetBookmark) {
    const currentTargetBookmarkIndex = this.bookmarks.findIndex(bookmark => bookmark == currentTargetBookmark);
    this.bookmarks.splice(currentTargetBookmarkIndex, 1);
}

const findCurrentTargetBookmarkByID = function (bookmarkID) {
    return this.bookmarks.find(bookmark => bookmark.id == bookmarkID);
}

const toggleBookmarkProperty = function (object, property) {
    object[property] = !object[property];
}

const toggleStoreProperty = function (property) {
    this[property] = !this[property];
}

// const setStoreErrorMessage = function (errorMessage) {
//     store.error = errorMessage;
// }

// const showErrorFeedback;

export default {
    bookmarks,
    adding,
    edit,
    error,
    filter,
    addDataToUIStoreDatabase,
    deleteCurrentTargetBookmark,
    findCurrentTargetBookmarkByID,
    toggleBookmarkProperty,
    toggleStoreProperty
}