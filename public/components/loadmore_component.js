// represents the button at the bottom of the list which loads more authors
(function(global, app) {

    var React = global._import('React').from(app.modules);

    var component = React.createClass({
        propTypes: {
          onClick: React.PropTypes.func.isRequired,
        },
        render: function() {
            var self = this;

            return React.createElement('a', {
                className: 'btn btn-primary',
                href: '#',
                onClick: self.onClick,
            }, 'Load More');
        },
        onClick: function(proxyEvent, originalEvent) {
            var self = this;
            proxyEvent.preventDefault();
            self.props.onClick();
        }
    });

    app.export('loadmore_component', component);
})(window, window.app);
