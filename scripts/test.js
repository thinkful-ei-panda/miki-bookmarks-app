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
        if (bookmark.edit && store.error) {
            return `
            <div class="bookmark-group">
                <div class="bookmark-group-row full-width">
                    <h2 class="align-self js-bookmark-element" id="${bookmark.id}">${bookmark.title}</h2>
                    <div class="right">
                        <button class="js-edit">Cancel</button>
                        <button class="js-delete">Delete</button>
                    </div>
                </div>
                <p class="js-bookmark-element left"><a href="${bookmark.url}" id="${bookmark.id}">${bookmark.url}</a></p>
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
            </div>
            `
        } else if (bookmark.edit) {
            return `
            <div class="bookmark-group">
                <div class="bookmark-group-row full-width">
                    <h2 class="align-self js-bookmark-element" id="${bookmark.id}">${bookmark.title}</h2>
                    <div class="right">
                        <button class="js-edit">Cancel</button>
                        <button class="js-delete">Delete</button>
                    </div>
                </div>
                <p class="js-bookmark-element left"><a href="${bookmark.url}" id="${bookmark.id}">${bookmark.url}</a></p>
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
            </div>
            `
        } else if (bookmark.expand) {
            return `
            <div class="bookmark-group">
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
            </div>
            `
        } else {
            return `
            <div class="bookmark-group">
                <div class="bookmark-group-row">
                    <h2 class="align-self item-shrink-left js-bookmark-element" id="${bookmark.id}">${bookmark.title} ${generateBookmarkRating(bookmark.rating)}</h2>
                    <div class="right">
                        <button class="js-edit">Edit</button>
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