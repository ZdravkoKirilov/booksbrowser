(function(global, app) {

    var React = global._import('React').from(app.modules);

    var component = React.createClass({
        getInitialState: function() {
            return {
                opened: false,
            }
        },
        propTypes: {
            title: React.PropTypes.string.isRequired,
            author: React.PropTypes.string.isRequired,
            publishDate: React.PropTypes.string.isRequired,
        },
        render: function() {
            var self = this;

            var author = self.state.opened ? self.props.author : '';
            var publishDate = self.state.opened ? self.props.publishDate : '';
            return React.createElement(
                'a', {
                    className: 'list-group-item',
                    onClick: self.onClick,
                    href: '#',
                },
                React.createElement('h4', {
                    className: 'list-group-item-heading',
                }, self.props.title),
                React.createElement('p', {
                        className: 'list-group-item-text',
                    },
                    React.createElement('p', null, author),
                    React.createElement('p', null, publishDate)
                )
            );
        },
        onClick: function(proxyEvent, originalEvent) {
          var self = this;
          proxyEvent.preventDefault();
          self.props.onBookClicked(proxyEvent, originalEvent, self);
        }
    });

    app.export('book_component', component);
})(window, window.app);
