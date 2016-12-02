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
            'Mocha': global.mocha,
            "Chai": global.chai,
            // 3rd party end


            //components start
            'root_component': null,
            'book_component': null,
            'loadmore_component': null,
            'sorting_component': null,
            'filter_component': null,
            'author_checkbox_component': null,
            'loading_component': null,
            // components end

            // helpers start
            'REST_Handler': null,
            'Randomizer': null,
            // helpers end

        },
        settings: {
            googleBooksAPI: "https://www.googleapis.com/books/v1/volumes?q=",
            sortingCriteria: {
              title: 'title',
              author: 'author',
            }
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
