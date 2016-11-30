// represents a checkbox for filtering books in the list according to the author

(function(global, app) {

    var React = global._import('React').from(app.modules);

    var component = React.createClass({
        propTypes: {
            onChange: React.PropTypes.func.isRequired,
            author_name: React.PropTypes.string.isRequired,
        },
        render: function() {
            var self = this;

            return React.createElement('div', {
                    className: 'checkbox'
                },
                React.createElement('label', null,
                    React.createElement('input', {
                        type: 'checkbox',
                        onChange: self.onChange,
                    }),
                    self.props.author_name
                )
            );


        },
        onChange: function(proxy, event, elem) {
            var self = this;
            self.props.onChange(self.props.author_name);
        },
    });

    app.export('author_checkbox_component', component);
})(window, window.app);
