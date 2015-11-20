var m = require("mithril");
var api = require('./api.js');
var ctrl = require("./ctrl.js");
var view = require ("./view.js");

function init(element, config) {
    var controller = new ctrl(config);

    m.render(element, view(controller));

    return api(controller);
}

module.exports = init;
module.exports.controller = ctrl;
module.exports.view = view;


