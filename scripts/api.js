const BASE_URL = 'https://thinkful-list-api.herokuapp.com/mischkiey/bookmarks'

const listAPIFetch = function (...args) {
    let error;
        return fetch (...args)
            .then (response => {
                if (!response.ok) {
                    error = {code: response.status};
                }
                return response.json();
            })
            .then(data => {
                if(error) {
                    // Always check API documentation on how to retrieve error message.
                    // HTTP error message can be retrieved only after being parsed unlike HTTP code.
                    error.message = data.message;
                    // Return error object 
                    return Promise.reject(error);
                }
                return data;
            });
};

const get = function () {
    return listAPIFetch(`${BASE_URL}`);
}

const post = function(jsonStringifiedFormData) {
    return listAPIFetch(`${BASE_URL}`, {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': jsonStringifiedFormData
    });
}

const deleteAPI = function (bookmarkID) {
    return listAPIFetch(`${BASE_URL}/${bookmarkID}`, {'method': 'DELETE'});
}

export default {
    listAPIFetch,
    get,
    post,
    deleteAPI
}
