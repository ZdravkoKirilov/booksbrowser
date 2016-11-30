// holds a set of checkboxes with Author names, which can filter the books in the list upon check/uncheck

(function(global, app) {

    var React = global._import('React').from(app.modules);
    var author_checkbox_component = global._import('author_checkbox_component').from(app.modules);

    var component = React.createClass({
        propTypes: {
            onChange: React.PropTypes.func.isRequired,
            authors: React.PropTypes.array.isRequired,
        },
        render: function() {
            var self = this;

            var checkboxes = self.props.authors.map(function(elem) {
                return React.createElement(author_checkbox_component, {
                    author_name: elem,
                    onChange: self.props.onChange,
                    key: elem,
                });
            });

            return React.createElement('div', null,
                'Filter by Author',
                checkboxes
            );

        },
    });

    app.export('filter_component', component);
})(window, window.app);
