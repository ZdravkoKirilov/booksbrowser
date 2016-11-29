(function(global, app) {

    var React = global._import('React').from(app.modules);
    var REST_Handler = global._import('REST_Handler').from(app.modules);
    var book_component = global._import('book_component').from(app.modules);
    var loadmore_component = global._import('loadmore_component').from(app.modules);
    var sorting_component = global._import('sorting_component').from(app.modules);
    var filter_component = global._import('filter_component').from(app.modules);
    var randomizer = global._import('Randomizer').from(app.modules);
    var lodash = global._import('Lodash').from(app.modules);

    var component = React.createClass({
        getInitialState: function() {
            return {
                books: [],
                sortingCriteria: 'title',
                currentFilters: [],
                unique_authors: {},
            }
        },
        render: function() {
            var self = this;

            var filteredBooks = self.filterBooks(self.state.books);

            return React.createElement(
                'div', {
                    className: 'list-group',
                },
                React.createElement(sorting_component, {
                    onClick: self.onSortBooksClicked,
                }),
                React.createElement(filter_component, {
                    onChange: self.onFilterBooksClicked,
                    authors: lodash.toArray(self.state.unique_authors),
                }),
                filteredBooks,
                React.createElement(loadmore_component, {
                    onClick: self.requestBooks,
                })
            );
        },
        componentDidMount: function() {
            var self = this;

            self.requestBooks();
        },
        requestBooks: function(options) {
            var self = this;

            var request = REST_Handler.getBooks({
                query: randomizer.getRandomAuthor(),
            });
            var authors = lodash.clone(self.state.unique_authors);

            request
                .then(function(response) {
                    var books = response.data.items.map(function(elem) {
                        var categories = elem.volumeInfo.categories || [];
                        var author = elem.volumeInfo.authors[0];
                        authors[author] = lodash[author] || author;

                        return React.createElement(book_component, {
                            key: elem.id + global.Date.now(),
                            title: elem.volumeInfo.title,
                            author: author,
                            publishDate: elem.volumeInfo.publishedDate,
                            onBookClicked: self.onBookClicked,
                            link: elem.volumeInfo.previewLink,
                            genre: categories.join(';'),
                        });
                    });
                    var currentBooks = self.state.books;
                    var totalBooks = currentBooks.concat(books);

                    self.setState({
                        books: self.sortBooks(totalBooks, self.state.sortingCriteria),
                        unique_authors: authors,
                    });
                })
                .catch(function(error) {
                    debugger;
                });
        },
        onBookClicked: function(eventProxy, event, child) {
            child.setState({
                opened: !child.state.opened,
            });
        },
        onSortBooksClicked: function(proxyEvent, originalEvent, sortingCriteria) {
            var self = this;
            var sortedBooks = self.sortBooks(self.state.books, sortingCriteria);
            this.setState({
                sortingCriteria: sortingCriteria,
                books: sortedBooks,
            });
        },
        onFilterBooksClicked: function(author) {
            var self = this;
            var result = [];
            if (lodash.includes(self.state.currentFilters, author)) {
                result = self.state.currentFilters.filter(function(elem) {
                    return elem !== author;
                });
            } else {
                result = self.state.currentFilters.concat([author]);
            }

            self.setState({
                currentFilters: result,
            });
        },
        sortBooks: function(books, sortingCriteria) {
            var self = this;
            var sortedBooks = lodash.sortBy(books, function(elem) {
                return elem.props[sortingCriteria];
            });
            return sortedBooks;
        },
        filterBooks: function(books) {
            var self = this;
            var filters = self.state.currentFilters;
            var result = [];

            if (filters.length) {
                var result = books.slice().filter(function(elem) {
                    return lodash.includes(filters, elem.props.author);
                });
            } else {
                result = books;
            }

            return result;
        },
    });

    app.export('root_component', component);
})(window, window.app);
