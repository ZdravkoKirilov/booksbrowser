(function(global, app) {

    var axios = global._import('Axios').from(app.modules);

    var handler = {
        getBooks: function(options) {
            var self = this;

            var baseURL = app.settings.googleBooksAPI;
            var query = options.query;
            var composedURL = baseURL + query;

            return axios.get(composedURL);
        },
    }

    app.export('REST_Handler', handler);
})(window, window.app);
