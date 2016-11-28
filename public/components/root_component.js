(function(global, app) {

    var React = global._import('React').from(app.modules);
    var REST_Handler = global._import('REST_Handler').from(app.modules);
    var book_component = global._import('book_component').from(app.modules);
    var loadmore_component = global._import('loadmore_component').from(app.modules);

    var component = React.createClass({
        getInitialState: function() {
            return {
                books: [],
            }
        },
        render: function() {
            var self = this;

            return React.createElement(
                'div', {
                    className: 'list-group',
                },
                self.state.books,
                React.createElement(loadmore_component, null)
            );
        },
        componentDidMount: function() {
            var self = this;

            var request = REST_Handler.getBooks({
                query: 'harry+potter',
            });

            request
                .then(function(response) {
                    var books = response.data.items.map(function(elem) {
                        return React.createElement(book_component, {
                            key: elem.id,
                            title: elem.volumeInfo.title,
                            author: elem.volumeInfo.authors[0],
                            publishDate: elem.volumeInfo.publishedDate,
                            onBookClicked: self.onBookClicked,
                        });
                    });
                    self.setState({
                        books: books,
                    });
                })
                .catch(function(error) {
                    debugger;
                });
        },
        requestMoreBooks: function(options) {

        },
        onBookClicked: function(eventProxy, event, child) {
            child.setState({
                opened: !child.state.opened,
            });
        },
    });

    app.export('root_component', component);
})(window, window.app);
