// root component and the de facto state container of the application, controlling the data flow and distributing the data among children down the component tree

(function(global, app) {

    var React = global._import('React').from(app.modules);
    var REST_Handler = global._import('REST_Handler').from(app.modules);
    var book_component = global._import('book_component').from(app.modules);
    var loadmore_component = global._import('loadmore_component').from(app.modules);
    var sorting_component = global._import('sorting_component').from(app.modules);
    var filter_component = global._import('filter_component').from(app.modules);
    var loading_component = global._import('loading_component').from(app.modules);
    var randomizer = global._import('Randomizer').from(app.modules);
    var lodash = global._import('Lodash').from(app.modules);

    var component = React.createClass({
        getInitialState: function() { // could be an initial state to a Redux store
            return {
                books: [],
                sortingCriteria: app.settings.sortingCriteria.title,
                currentFilters: [],
                unique_authors: {},
                isLoading: false,
                last_fetch_succeeded: true,
            }
        },
        render: function() {
            var self = this;

            var filteredBooks = self.filterBooks(self.state.books).map(function(props) {
                var props_clone = lodash.clone(props); // keeping the original books data serializable by not adding any functions to it
                props_clone.onBookClicked = self.onBookClicked;
                return React.createElement(book_component, props_clone);
            });

            return React.createElement(
                'div', {
                    className: 'list-group',
                },
                React.createElement(sorting_component, {
                    onClick: self.onSortBooksClicked,
                    sortingCriteria: self.state.sortingCriteria,
                }),
                React.createElement(filter_component, {
                    onChange: self.onFilterBooksClicked,
                    authors: lodash.toArray(self.state.unique_authors),
                }),
                filteredBooks,
                React.createElement(loadmore_component, {
                    onClick: self.requestBooks,
                }),
                React.createElement(loading_component, {
                    isLoading: self.state.isLoading,
                    last_fetch_succeeded: self.state.last_fetch_succeeded,
                })
            );
        },
        componentDidMount: function() {
            var self = this;
            self.requestBooks();
        },
        componentDidUpdate: function() { // debugging purposes
            console.dir(this);
        },
        requestBooks: function(options) {
            var self = this;

            var request = REST_Handler.getBooks({
                query: randomizer.getRandomAuthor(),
            });
            self.setState({
                isLoading: true,
            });
            var authors = lodash.clone(self.state.unique_authors);
            request
                .then(function(response) {
                    var fetched_books = response.data.items.map(function(elem) {
                        var categories = elem.volumeInfo.categories || [];
                        var author = elem.volumeInfo.authors[0];
                        authors = self.addAuthor(authors, author);

                        return {
                            key: elem.id + global.Date.now(),
                            title: elem.volumeInfo.title,
                            author: author,
                            publishDate: elem.volumeInfo.publishedDate,
                            link: elem.volumeInfo.previewLink,
                            genre: categories.join(';'),
                        }

                    });
                    var totalBooks = self.addBooks(self.state.books, fetched_books);

                    self.setState({
                        books: self.sortBooks(totalBooks, self.state.sortingCriteria),
                        unique_authors: authors,
                        isLoading: false,
                        last_fetch_succeeded: true,
                    });
                })
                .catch(function(error) {
                    self.setState({
                        isLoading: false,
                        last_fetch_succeeded: false,
                    });
                });
        },
        onBookClicked: function(child) {
            child.setState({
                opened: !child.state.opened,
            });
        },
        onSortBooksClicked: function(sortingCriteria) {
            var self = this;
            var sortedBooks = self.sortBooks(self.state.books, sortingCriteria);
            this.setState({
                sortingCriteria: sortingCriteria,
                books: sortedBooks,
            });
        },
        addAuthor: function(unique_authors, author) { // authors reducer
            var authors = lodash.clone(unique_authors);
            authors[author] = authors[author] || author;
            return authors;
        },
        addBooks: function(current, additional) { // reducer for adding books
            return current.concat(additional);
        },
        onFilterBooksClicked: function(author) { //reducer for filters
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
        sortBooks: function(books, sortingCriteria) { // reducer for book sorting
            var self = this;
            var sortedBooks = lodash.sortBy(books, function(elem) {
                return elem[sortingCriteria];
            });
            return sortedBooks;
        },
        filterBooks: function(books) { // reducer for book filtering
            var self = this;
            var filters = self.state.currentFilters;
            var result = [];

            if (filters.length) {
                var result = books.slice().filter(function(elem) {
                    return lodash.includes(filters, elem.author);
                });
            } else {
                result = books;
            }

            return result;
        },
    });

    app.export('root_component', component);
})(window, window.app);
