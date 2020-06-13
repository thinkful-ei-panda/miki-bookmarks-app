import store from './store.js'
import api from './api.js';

const htmlGenerator = function (bookmarks) {
    if (store.adding) {
        $('.js-add').text('Cancel')
        return addBookmarkView();
    } else {
        $('.js-add').text('Add Bookmark')
        return bookmarksView(bookmarks);
    }
}

const addBookmarkView = function() {
    if (store.error) {
        return `
        <div class="wrapper">
            <form class="group" id="js-add-bookmark-form">
                <div class="item">
                    <p class="left">*Something's not quite right: ${store.error}</p>
                </div>
                <label class="item" for="title">Title</label>
                <input class="item" id ="title" name="title" placeholder="Title" type="text" required>
                <label class="item" for="rating">Rating</label>
                <select id="rating" name="rating">
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
    }

    return `
    <div class="wrapper">
            <form class="group" id="js-add-bookmark-form">
                <label class="item" for="title">Title</label>
                <input class="item" id ="title" name="title" placeholder="Title" type="text" required>
                <label class="item" for="rating">Rating</label>
                <select id="rating" name="rating">
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
}

const bookmarksView = function (bookmarks) {
    const bookmarksElements = bookmarks.map(bookmark => {
        if (bookmark.expand) {
            return `
            <div class="group">
                <div class="group-row">
                    <p class="js-bookmark-element" id="${bookmark.id}">${bookmark.title}</p>
                    <div class="right">
                        <button class="delete">delete</button>
                        <button class="js-expand-and-collapse">collapse</button>
                    </div>
                </div>
                <div class="item">
                    <p class="js-bookmark-element left" id="${bookmark.id}">${bookmark.rating}</p>
                </div>
                <div class="item">
                    <a href="${bookmark.url}" id="${bookmark.id}">${bookmark.url}</a>
                </div>
                <div class="item">
                    <p class="js-bookmark-element left" id="${bookmark.id}">${bookmark.desc}</p>
                </div>
            </div>
            `
        } else {
            return `
            <div class="group">
                <div class="group-row">
                    <p class="js-bookmark-element" id="${bookmark.id}">${bookmark.title}</p>
                    <p class="js-bookmark-element" id="${bookmark.id}">Rating: ${bookmark.rating}</p>
                    <div class="right">
                        <button class="js-delete">delete</button>
                        <button class="js-expand-and-collapse">expand</button>
                    </div>
                </div>
            </div>
        `
        };
    });

    return `
    <div class="wrapper">
        ${bookmarksElements.join('')}
    </div>
    `

}

const expandAndCollapseBookmark = function () {
    $('.js-bookmarks-list').on('click', '.js-expand-and-collapse', event => {
        const bookmarkID = $(event.currentTarget).closest('.group-row').find('.js-bookmark-element').attr('id');
        const currentTargetBookmark = store.findCurrentTargetBookmarkByID(bookmarkID);
        store.toggleBookmarkProperty(currentTargetBookmark, 'expand');
        render();
    })
}

const deleteBookmark = function () {
    $('.js-bookmarks-list').on('click', '.js-delete', event => {
        const bookmarkID = $(event.currentTarget).closest('.group-row').find('.js-bookmark-element').attr('id');
        const currentTargetBookmark = store.findCurrentTargetBookmarkByID(bookmarkID);
        store.deleteCurrentTargetBookmark(currentTargetBookmark);
        api.deleteAPI(bookmarkID);
        render();
    })
}

const addBookmark = function() {
    $('.js-add').click(event => {
        store.toggleStoreProperty('adding');
        store.error = null;
        render();
    })
}

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
            })
    })
}

const filterBookmarkByRating = function() {
    $('[name="js-filter-by-rating"]').change(event => {
        store.filter = $('option:selected').val();
        render();
    })
}

const render = function () {
    let bookmarks = [];
    if (store.filter > 0) {
        bookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.filter);
    } else {
        bookmarks = store.bookmarks;
    }
    const currentView = htmlGenerator(bookmarks);
    $('.js-bookmarks-list').html(currentView);
}

const bindEventListeners = function () {
    expandAndCollapseBookmark();
    deleteBookmark();
    addBookmark();
    submitAddBookmarkForm();
    filterBookmarkByRating();
}

export default {
    bindEventListeners,
    render
}