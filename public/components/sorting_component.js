(function(global, app) {

    var React = global._import('React').from(app.modules);

    var component = React.createClass({
        getInitialState: function() {
            return {
                active: false,
            }
        },
        propTypes: {
            onClick: React.PropTypes.func.isRequired,
        },
        render: function() {
            var self = this;

            return React.createElement('div', null,
                React.createElement('a', {
                    className: 'btn btn-info',
                    onClick: self.onBookNameSort,
                }, 'Sort by Book Name'),
                React.createElement('a', {
                    className: 'btn btn-info',
                    onClick: self.onAuthorNameSort,
                }, 'Sort by Author Name')
            );

        },
        onBookNameSort: function(proxy, event) {
            var self = this;
            event.preventDefault();
            self.props.onClick('title');
        },
        onAuthorNameSort: function(proxy, event) {
            var self = this;
            event.preventDefault();
            self.props.onClick('author');
        },
    });

    app.export('sorting_component', component);
})(window, window.app);
