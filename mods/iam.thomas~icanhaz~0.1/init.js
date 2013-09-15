// vertx
var vertx = require('vertx');
var container = require('vertx/container');
var console = require('vertx/console');
var config = container.config;
var eb = vertx.eventBus;

// defaults
var address = container.config.address || "template.icanhaz"
var template_dir = container.config.template_dir || "./templates"
var template_suffix = container.config.template_suffix || "html"

// lib
var ich = require('./lib/ICanHaz.js');

console.log('config is ' + JSON.stringify(container.config));

/**
 * Recursevly scans a dir for files!
 *
 * @param path
 */
var _scanDir = function (path) {
    vertx.fileSystem.readDir(path, function (err, files) {
        console.log('Directory "' + path + '" contains these ' + files.length + ' items:');
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var fileprops = vertx.fileSystem.propsSync(file);

            if (fileprops.isDirectory) {
                _scanDir(file);
            } else if (fileprops.isRegularFile) {

                // regex to only scan .html files
                var regex_file_type = /[^\.]+$/gim;
                if (regex_file_type.exec(file)[0] == template_suffix) {

                    // regex to get filename = template name
                    var regex_template_name = /([^\/]+)(?=\.\w+$)/gm;
                    var template_name = regex_template_name.exec(file)[0];
                    var template_content = vertx.fileSystem.readFileSync(file).toString();

                    // add template to icanhaz
                    ich.addTemplate(template_name, template_content);
                    console.log('[+] Template: "' + template_name);
                }
            }
        }
    });
};

// bootstrap, trigger initial scan
_scanDir(template_dir);


// defining handler method
var renderWithICHAction = function (param, response) {
    console.log('[' + address + '] rendering template [' + param.template + '] with data: ' + JSON.stringify(param.data));
    response(ich[param.template](param.data));
}

// finally attaching handler to vertx eventbus
eb.registerHandler(address, renderWithICHAction, function () {
    console.log('[' + address + '] handler registered!')
});


