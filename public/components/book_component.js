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
            genre: React.PropTypes.string.isRequired,
            link: React.PropTypes.string.isRequired,
            onBookClicked: React.PropTypes.func.isRequired,
        },
        render: function() {
            var self = this;

            var author = self.props.author;
            var publishDate = self.state.opened ? self.props.publishDate : '';
            var genre = self.state.opened ? self.props.genre : '';
            var link = self.state.opened ? self.props.link : '';

            return React.createElement(
                'a', {
                    className: 'list-group-item',
                    href: '#',
                },
                React.createElement('h4', {
                    className: 'list-group-item-heading',
                    onClick: self.onClick,
                }, self.props.title),
                React.createElement('p', {
                        className: 'list-group-item-text',
                    },
                    React.createElement('p', null, author),
                    React.createElement('p', null, genre),
                    React.createElement('p', null, publishDate),
                    React.createElement('a', {
                        href: link,
                        onClick: self.onBookLinkClicked,
                        target: '_blank',
                    }, link)
                )
            );
        },
        onClick: function(proxyEvent, originalEvent) {
            var self = this;
            proxyEvent.preventDefault();
            self.props.onBookClicked(proxyEvent, originalEvent, self);
        },
        onBookLinkClicked: function(event) {
            event.stopPropagation();
        },
    });

    app.export('book_component', component);
})(window, window.app);
