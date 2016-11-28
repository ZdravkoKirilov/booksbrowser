(function(global, app) {

    var React = global._import('React').from(app.modules);

    var component = React.createClass({
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
        }
    });

    app.export('loadmore_component', component);
})(window, window.app);
