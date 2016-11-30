// holds the 2 buttons for sorting the books in the list according to Book Title / Author Name

(function(global, app) {

    var React = global._import('React').from(app.modules);

    var component = React.createClass({
        propTypes: {
            onClick: React.PropTypes.func.isRequired,
            sortingCriteria: React.PropTypes.string,
        },
        render: function() {
            var self = this;

            var sortingCriteria = self.props.sortingCriteria;
            var title_css_class = 'btn btn-default';
            var author_css_class = 'btn btn-default';

            if (sortingCriteria === app.settings.sortingCriteria.title) {
                title_css_class = 'btn btn-primary';
            }
            if (sortingCriteria === app.settings.sortingCriteria.author) {
                author_css_class = 'btn btn-primary';
            }

            return React.createElement('div', null,
                React.createElement('a', {
                    className: title_css_class,
                    onClick: self.onBookNameSort,
                }, 'Sort by Book Name'),
                React.createElement('a', {
                    className: author_css_class,
                    onClick: self.onAuthorNameSort,
                }, 'Sort by Author Name')
            );

        },
        onBookNameSort: function(proxy, event) {
            var self = this;
            event.preventDefault();
            self.props.onClick(app.settings.sortingCriteria.title);
        },
        onAuthorNameSort: function(proxy, event) {
            var self = this;
            event.preventDefault();
            self.props.onClick(app.settings.sortingCriteria.author);
        },
    });

    app.export('sorting_component', component);
})(window, window.app);
