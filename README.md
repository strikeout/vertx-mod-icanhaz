vertx-mod-icanhaz
=================

Attaches itself to the vertx-eventbus, scans given directory recursivley for template files and
provides server-side rendering using the ICanHaz templating library.

Can be easily adapted for other templating engines like dust.js, mustache, handlebars, etc..


## Usage

After being attached to the vertx-eventbus, send a JSON object
containing "template_name" and a "data"-object to the handler

Example:
	var address = 'template.icanhaz';
	var template_name = 'index';
	var template_data = {"name":"tom"};

	eventbus.send(address, {"template": template, "data": template_data})



