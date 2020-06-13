import store from './store.js'
import api from './api.js';

const mainHTMLGenerator = function (bookmarks) {
    if (store.adding) {
        $('.js-add').text('Cancel');
        return generateAddBookmarkView();
    } else {
        $('.js-add').text('Add a Bookmark');
        return generateBookmarksView(bookmarks);
    };
};

const generateAddBookmarkView = function() {
    if (store.error) {
        return `
        <div class="bookmark-wrapper">
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
                <div class="center item">
                    <button class="">submit</button>
                </div>
            </form>
        </div>`
    };

    return `
    <div class="bookmark-wrapper">
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
                <div class="center item">
                    <button class="">submit</button>
                </div>
            </form>
        </div>`
};

const generateBookmarksView = function (bookmarks) {
    const bookmarksViewElements = bookmarks.map(bookmark => {
        if (bookmark.expand) {
            return `
            <div class="bookmark-group">
                <div class="bookmark-group-row full-width">
                    <h2 class="align-self js-bookmark-element" id="${bookmark.id}">${bookmark.title}</h2>
                    <div class="right">
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
            </div>
            `
        } else {
            return `
            <div class="bookmark-group">
                <div class="bookmark-group-row">
                    <h2 class="align-self js-bookmark-element" id="${bookmark.id}">${bookmark.title}</h2>
                    <p class="align-self js-bookmark-element" id="${bookmark.id}">Rating: ${generateBookmarkRating(bookmark.rating)}</p>
                    <div class="right">
                        <button class="js-delete">Delete</button>
                        <button class="js-expand-and-collapse">Expand</button>
                    </div>
                </div>
            </div>
        `
        };
    });
    return `
    <div class="bookmark-wrapper">
        ${bookmarksViewElements.join('')}
    </div>
    `
};

const generateBookmarkRating = function(rating) {
    let bookmarkRating = ""
    for (let i = 0; i < rating; i++) {
        bookmarkRating += `<img src="images/star.jpg" alt="star">`
    }
    return bookmarkRating;
}

const addBookmark = function() {
    $('.js-add').click(event => {
        store.toggleStoreProperty('adding');
        store.error = null;
        render();
    })
};

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
        const jsonStringifiedFormData = ($('#js-add-bookmark-form').serializeJSON());

        api.post(jsonStringifiedFormData)
          .then(data => {
              data['expand'] = false;
              store.bookmarks.push(data);
              store.toggleStoreProperty('adding');
              render();
          })
          .catch(error => {
              store.error = error.message;
              render();
            });
    });
};

const deleteBookmark = function () {
    $('.js-bookmarks-list').on('click', '.js-delete', event => {
        const bookmarkID = $(event.currentTarget).closest('.bookmark-group-row').find('.js-bookmark-element').attr('id');
        const currentBookmark = store.findCurrentBookmarkByID(bookmarkID);
        store.removeBookmarkFromUIStoreDatabase(currentBookmark);
        api.deleteAPI(bookmarkID);
        render();
    })
};

const expandAndCollapseBookmark = function () {
    $('.js-bookmarks-list').on('click', '.js-expand-and-collapse', event => {
        const bookmarkID = $(event.currentTarget).closest('.bookmark-group-row').find('.js-bookmark-element').attr('id');
        const currentBookmark = store.findCurrentBookmarkByID(bookmarkID);
        store.toggleBookmarkProperty(currentBookmark, 'expand');
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
    expandAndCollapseBookmark();
    filterBookmarksByRating();
    submitAddBookmarkForm();
}

export default {
    bindEventListeners,
    render
}