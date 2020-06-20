import api from './api.js'
import bookmarkList from './bookmark-list.js'
import store from './store.js'

const main = () => {
    api.get()
        .then(data => {
            store.addBookmarkToUIStoreDatabase(data);
            bookmarkList.render();
        })
        .catch(error => {
            store.error = error;
            bookmarkList.render();
        })
    
    bookmarkList.bindEventListeners();
    bookmarkList.render();
};

$(main)