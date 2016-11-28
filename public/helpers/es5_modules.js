(function(global, app) {

    global._import = function(module) {
        return {
            from: function(source) {
                return source[module];
            }
        }
    }

    app.export = function(name, module) {
        if (!(name in app.modules)) {
            throw new Error('Module "' + name + '" must have a placeholder in app.js before being registered as a real module.');
        }
        else {
            app.modules[name] = module;
        }
    };
})(window, window.app);
