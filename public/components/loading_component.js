// a spinning loader which is shown while fethcing data + Error text when the request fails
(function(global, app) {

    var React = global._import('React').from(app.modules);

    var component = React.createClass({
        propTypes: {
            isLoading: React.PropTypes.bool.isRequired,
            last_fetch_succeeded: React.PropTypes.bool.isRequired,
        },
        render: function() {
            var self = this;

            var img_style = self.props.isLoading ? {
                display: 'initial',
            } : {
                display: 'none',
            }
            var status = self.props.last_fetch_succeeded ? '' : 'There was a problem with fetching the books. Please try again.';

            return React.createElement('div', {

                }, React.createElement('img', {
                    src: 'http://localhost:3000/public/assets/spinner.gif',
                    alt: 'loading image',
                    style: img_style,
                }),
                React.createElement('p', {
                    style: {
                        color: 'Red',
                    }
                }, status)
            );
        },
    });

    app.export('loading_component', component);
})(window, window.app);
