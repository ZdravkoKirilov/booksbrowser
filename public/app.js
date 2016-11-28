(function(global) {

    global.app = {
        modules: {
            // 3rd party start
            'React': global.React,
            'ReactDOM': global.ReactDOM,
            'ReactRouter': global.ReactRouter,
            'ReactRedux': global.ReactRedux,
            'Lodash': global._,
            'Redux': global.Redux,
            'Axios': global.axios,
            // 3rd party end


            //components start
            'root_component': null,
            'book_component': null,
            'loadmore_component': null,
            // components end

            // api start
            'REST_Handler': null,
            // api end

        },
        settings: {
            googleBooksAPI: "https://www.googleapis.com/books/v1/volumes?q="
        },
    };

    document.addEventListener('DOMContentLoaded', function() {
        var app = global.app;
        var root = global._import('root_component').from(app.modules);
        var ReactDOM = global._import('ReactDOM').from(app.modules);
        var React = global._import('React').from(app.modules);
        ReactDOM.render(React.createElement(root), document.getElementById('app-root'));

    });
})(window);
