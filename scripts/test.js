// Test space for extension user story

const htmlGenerator = function (bookmarks) {
    if (store.adding) {
        $('.js-add').text('cancel')
        return generateAddBookmarkView();
    } else if (store.edit) {
        $('.js-add').text('add a bookmark')
        return generateEditBookmarkView(bookmarks);
    } else {
        $('.js-add').text('add a bookmark')
        return generateBookmarksView(bookmarks);
    };
};

const generateBookmarksView = function (bookmarks) {
    const bookmarksViewElements = bookmarks.map(bookmark => {
        if (bookmark.edit) {
            return `
            <div class="group">
                <div class="group-row">
                    <p class="js-bookmark-element" id="${bookmark.id}">${bookmark.title}</p>
                    <div class="right">
                        <button class="js-edit">edit</button>
                        <button class="delete">delete</button>
                        <button class="js-expand-and-collapse">collapse</button>
                    </div>
                </div>
                <div class="item">
                    <a href="${bookmark.url}" id="${bookmark.id}">${bookmark.url}</a>
                </div>
                <div class="item">
                    <p class="js-bookmark-element left" id="${bookmark.rating}">${bookmark.rating}</p>
                </div>
                <div class="item">
                    <p class="js-bookmark-element left" id="${bookmark.id}">${bookmark.url}</p>
                </div>
            </div>
                `
        } else if (bookmark.expand) {
            return `
            <div class="group">
                <div class="group-row">
                    <p class="js-bookmark-element" id="${bookmark.id}">${bookmark.title}</p>
                    <div class="right">
                        <button class="js-edit">edit</button>
                        <button class="delete">delete</button>
                        <button class="js-expand-and-collapse">collapse</button>
                    </div>
                </div>
                <div class="item">
                    <a href="${bookmark.url}" id="${bookmark.id}">${bookmark.url}</a>
                </div>
                <div class="item">
                    <p class="js-bookmark-element left" id="${bookmark.rating}">${bookmark.rating}</p>
                </div>
                <div class="item">
                    <p class="js-bookmark-element left" id="${bookmark.id}">${bookmark.url}</p>
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
                        <button class="js-edit">edit</button>
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
        ${bookmarksViewElements.join('')}
    </div>
    `

}

const editBookmark = function () {
    $('.js-bookmarks-list').on('click', '.js-edit', event => {
        const bookmarkID = $(event.currentTarget).closest('.group-row').find('.js-bookmark-element').attr('id');
        const currentTargetBookmark = store.findCurrentTargetBookmarkByID(bookmarkID);
        store.toggleStoreProperty('edit');
        store.toggleBookmarkProperty(currentTargetBookmark, 'edit');
        render();
    })
}

const editBookmarkForm = function() {
    $('.js-bookmarks-list').on('submit', '#js-edit-bookmark-form', event => {
        event.preventDefault();
        const bookmarkID = $(event.currentTarget).closest('.group-row').find('.js-bookmark-element').attr('id');

        $.fn.extend({
            serializeJSON: function() {
              const formData = new FormData(this[0]);
              const jsFormData = {};
              formData.forEach((val, name) => jsFormData[name] = val);
              return JSON.stringify(jsFormData);
            }
          });
        const jsonStringifiedFormData = ($('#js-edit-bookmark-form').serializeJSON());

        api.patch(jsonStringifiedFormData, bookmarkID)
          .then(data => {
              data['expand'] = false;
              const editThisBookmark = store.bookmarks.find(bookmark => bookmark.id === data.id);
              Object.assign(editThisBookmark, data);
              store.toggleStoreProperty('edit');
              render();
          })
          .catch(error => {
              console.log(error.message)
              store.error = error.message;
              render();
            });
    });
};
