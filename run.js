var vertx = require('vertx');
var container = require('vertx/container');
var console = require('vertx/console');

config = container.config;

container.deployModule('iam.thomas~icanhaz~0', config);

// bus send -r -f JSON template.ich {"template": "index", "data":{"name":"tom"}}
container.deployModule("org.crashub~vertx.shell~2.0.0", {
    "cmd": ".",
    "crash.auth": "simple",
    "crash.auth.simple.username": "admin",
    "crash.auth.simple.password": "admin",
    "crash.ssh.port": 2000
});

container.deployModule('iam.thomas~icanhaz~0.1', config, 1);

/**
 * for testing, attach the crashub shell here:
 * example:
 * bus send -r -f JSON template.ich {"template": "index", "data":{"name":"tom"}}
 */

//container.deployModule("org.crashub~vertx.shell~2.0.0", {
//    "cmd": ".",
//    "crash.auth": "simple",
//    "crash.auth.simple.username": "admin",
//    "crash.auth.simple.password": "admin",
//    "crash.ssh.port": 2000
//});
