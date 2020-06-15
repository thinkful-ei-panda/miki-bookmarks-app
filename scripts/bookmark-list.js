import store from './store.js'
import api from './api.js';

const mainHTMLGenerator = function (bookmarks) {
    if (store.adding) {
        $('.js-add').text('Cancel')
        return generateAddBookmarkView();
    } else if (store.edit) {
        $('.js-add').text('Add a Bookmark');
        return generateEditBookmarkView();
    } else {
        $('.js-add').text('Add a Bookmark');
        return generateBookmarksView(bookmarks);
    };
};

const generateAddBookmarkView = function() {
    if (store.error) {
        return `
        <section class="bookmark-wrapper">
            <form class="bookmark-group" id="js-add-bookmark-form">
                <div class="error item">
                    <p class="left">*Something's not quite right: ${store.error}</p>
                </div>
                <label class="item" for="title">Title</label>
                <input class="item" id ="title" name="title" placeholder="Title" type="text" required>
                <label class="item" for="rating">Rating</label>
                <select class="item" id="rating" name="rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label class="item" for="url">URL</label>
                <input class="item" id ="url" name="url" placeholder="URL" type="text" required>
                <label class="item" for="desc">Description</label>
                <textarea class="item" id="desc" name="desc" placeholder="Description" rows="10" type="text"></textarea>
                <button class="">submit</button>
            </form>
        </section>`
    };

    return `
    <section class="bookmark-wrapper">
            <form class="bookmark-group" id="js-add-bookmark-form">
                <label class="item" for="title">Title</label>
                <input class="item" id ="title" name="title" placeholder="Title" type="text" required>
                <label class="item" for="rating">Rating</label>
                <select class="item" id="rating" name="rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label class="item" for="url">URL</label>
                <input class="item" id ="url" name="url" placeholder="URL" type="text" required>
                <label class="item" for="desc">Description</label>
                <textarea class="item" id="desc" name="desc" placeholder="Description" rows="10" type="text"></textarea>
                <button class="submit">Add New Bookmark</button>
            </form>
        </section>`
};

const generateEditBookmarkView = function(bookmark) {
    if (store.error) {
        return `
            <div class="bookmark-wrapper">
                <section class="bookmark-group">
                    <div class="bookmark-group-row full width">
                        <h2 class="align-self js-bookmark-element" id="${store.editBookmark.id}">${store.editBookmark.title}</h2>
                        <div class="right">
                            <button class="js-edit">Cancel</button>
                        </div>
                    </div>
                    <p class="js-bookmark-element left"><a href="${store.editBookmark.url}" id="${store.editBookmark.id}">${store.editBookmark.url}</a></p>
                    <div class="error item">
                        <p class="left">*Something's not quite right: ${store.error}</p>
                    </div>
                    <form class="bookmark-group-column" id="js-edit-bookmark-form">
                        <label class="item" for="rating">Rating</label>
                        <select class="item" id="rating" name="rating">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <label class="item" for="desc">Description</label>
                        <textarea class="item" id="desc" name="desc" placeholder="Enter new description" rows="10" type="text"></textarea>
                        <button class="submit">Submit Changes</button>
                    </form>
                </section>
            </div>
            `
    }

    return `
        <div class="bookmark-wrapper">
            <section class="bookmark-group">
                <div class="bookmark-group-row full-width">
                    <h2 class="align-self js-bookmark-element" id="${store.editBookmark.id}">${store.editBookmark.title}</h2>
                    <div class="right">
                        <button class="js-edit">Cancel</button>
                    </div>
                </div>
                <p class="js-bookmark-element left"><a href="${store.editBookmark.url}" id="${store.editBookmark.id}">${store.editBookmark.url}</a></p>
                <form class="bookmark-group-column" id="js-edit-bookmark-form">
                    <label class="item" for="rating">Rating</label>
                    <select class="item" id="rating" name="rating">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <label class="item" for="desc">Description</label>
                    <textarea class="item" id="desc" name="desc" placeholder="Enter new description" rows="10" type="text"></textarea>
                    <button class="submit">Submit Changes</button>
                </form>
            </section>
        </div>
        `    
};

const generateBookmarksView = function (bookmarks) {
    const bookmarksViewElements = bookmarks.map(bookmark => {
        if (bookmark.expand) {
            return `
            <section class="bookmark-group">
                <div class="bookmark-group-row full-width">
                    <h2 class="align-self js-bookmark-element" id="${bookmark.id}">${bookmark.title}</h2>
                    <div class="right">
                        <button class="js-edit">Edit</button>
                        <button class="js-delete">Delete</button>
                        <button class="js-expand-and-collapse">Collapse</button>
                    </div>
                </div>
                <div class="item">
                    <p class="js-bookmark-element left" id="${bookmark.id}">Rating: ${generateBookmarkRating(bookmark.rating)}</p>
                </div>
                <div class="item">
                    <p class="js-bookmark-element left"><a href="${bookmark.url}" id="${bookmark.id}">${bookmark.url}</a></p>
                </div>
                <div class="item">
                    <p class="js-bookmark-element left" id="${bookmark.id}">${bookmark.desc}</p>
                </div>
            </section>
            `
        } else {
            return `
            <section class="bookmark-group">
                <div class="bookmark-group-row">
                    <h2 class="align-self item-shrink-left js-bookmark-element" id="${bookmark.id}">${bookmark.title} ${generateBookmarkRating(bookmark.rating)}</h2>
                    <div class="right">
                        <button class="js-edit">Edit</button>
                        <button class="js-delete">Delete</button>
                        <button class="js-expand-and-collapse">Expand</button>
                    </div>
                </div>
            </section>
        `
        };
    });
    
    return `
    <div class="bookmark-wrapper">
        ${bookmarksViewElements.join('')}
    </div>
    `
};

const generateBookmarkRating = function(value) {
    let bookmarkRating = "";
    for (let i = 0; i < value; i++) {
        bookmarkRating += `<img src="images/star.jpg" alt="star">`
    }
    return bookmarkRating;
};

const addBookmark = function() {
    $('.js-add').click(event => {
        store.toggleProperty(store, 'adding');
        store.error = null;
        render();
    });
};

// How can I simplify this?

const submitAddBookmarkForm = function() {
    $('.js-bookmarks-list').on('submit', '#js-add-bookmark-form', event => {
        event.preventDefault();

        $.fn.extend({
            serializeJSON: function() {
              const formData = new FormData(this[0]);
              const jsFormData = {};
              formData.forEach((val, name) => jsFormData[name] = val);
              return JSON.stringify(jsFormData);
            }
        });
        const jsonStringifiedFormData = $('#js-add-bookmark-form').serializeJSON();

        api.post(jsonStringifiedFormData)
          .then(data => {
              data['expand'] = false;
              data['edit'] = false;
              store.bookmarks.push(data);
              store.toggleProperty(store, 'adding');
              render();
          })
          .catch(error => {
              store.error = error.message;
              render();
            });
    });
};

const editBookmark = function() {
    $('.js-bookmarks-list').on('click', '.js-edit', event => {
        const bookmarkID = $(event.currentTarget).closest('.bookmark-group').find('.js-bookmark-element').attr('id');
        const currentBookmark = store.findCurrentBookmarkByID(bookmarkID);
        store.toggleProperty(store, 'edit');
        store.editBookmark = currentBookmark;
        store.error = null;
        render();
    })
}

const submitEditBookmarkForm = function () {
    $('.js-bookmarks-list').on('submit', '#js-edit-bookmark-form', event => {
        event.preventDefault();
        
        const bookmarkID = store.editBookmark.id;
        const currentTargetBookmark = store.editBookmark;
        const editedBookmark = store.editBookmark;

        $.fn.extend({
            serializeJSON: function() {
              const formData = new FormData(this[0]);
              const jsFormData = {};
              formData.forEach((val, name) => jsFormData[name] = val);   
              return jsFormData           
            }
        });

        const jsFormData = $('#js-edit-bookmark-form').serializeJSON();
        editedBookmark['rating'] = jsFormData['rating'];
        editedBookmark['desc'] = jsFormData['desc'];
        store.editBookmarkInUIStoreDatabase(currentTargetBookmark, editedBookmark);
        const jsonStringifiedFormData = JSON.stringify(jsFormData);

        api.patch(jsonStringifiedFormData, bookmarkID)
            .then(() => {
                store.toggleProperty(store, 'edit')
                store.error = null;
                render()
            })
            .catch(error => {
                store.error = error.message;
                render();
            });
    });
};

const deleteBookmark = function () {
    $('.js-bookmarks-list').on('click', '.js-delete', event => {
        const bookmarkID = $(event.currentTarget).closest('.bookmark-group').find('.js-bookmark-element').attr('id');
        const currentBookmark = store.findCurrentBookmarkByID(bookmarkID);
        store.removeBookmarkFromUIStoreDatabase(currentBookmark);
        api.deleteAPI(bookmarkID);
        render();
    })
};

const expandAndCollapseBookmark = function () {
    $('.js-bookmarks-list').on('click', '.js-expand-and-collapse', event => {
        const bookmarkID = $(event.currentTarget).closest('.bookmark-group').find('.js-bookmark-element').attr('id');
        const currentBookmark = store.findCurrentBookmarkByID(bookmarkID);
        store.toggleProperty(currentBookmark, 'expand');
        render();
    });
};

const filterBookmarksByRating = function() {
    $('[name="js-filter-by-rating"]').change(event => {
        store.filter = $('option:selected').val();
        render();
    });
};

const render = function () {
    let bookmarks = [];
    if (store.filter > 0) {
        bookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.filter);
    } else {
        bookmarks = store.bookmarks;
    }
    const currentView = mainHTMLGenerator(bookmarks);
    $('.js-bookmarks-list').html(currentView);
};

const bindEventListeners = function () {
    addBookmark();
    deleteBookmark();
    editBookmark();
    expandAndCollapseBookmark();
    filterBookmarksByRating();
    submitAddBookmarkForm();
    submitEditBookmarkForm();
}

export default {
    bindEventListeners,
    render
}