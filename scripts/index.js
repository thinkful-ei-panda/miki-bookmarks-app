import api from './api.js'
import bookmarkList from './bookmark-list.js'
import store from './store.js'

const main = () => {
    api.get()
        .then(data => {
            store.addDataToUIStoreDatabase(data);
            bookmarkList.render();
        })
        // .catch(error => showErrorFeedback)
    
    bookmarkList.bindEventListeners();
    bookmarkList.render();
};



$(main)