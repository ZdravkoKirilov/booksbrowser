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
        onBookNameSort: function(proxyEvent, originalEvent) {
            var self = this;
            proxyEvent.preventDefault();
            self.props.onClick(proxyEvent, originalEvent, 'title');
        },
        onAuthorNameSort: function(proxyEvent, originalEvent) {
            var self = this;
            proxyEvent.preventDefault();
            self.props.onClick(proxyEvent, originalEvent, 'author');
        },
    });

    app.export('sorting_component', component);
})(window, window.app);
