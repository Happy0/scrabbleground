var m = require("mithril");
var api = require('./api.js');
var ctrl = require("./ctrl.js");
var view = require ("./view.js");

function init(element, config) {
    var controller = new ctrl(config);

    var component = {
        controller: function() {
            return controller;
        },
        view: function(controller) { 
            return view(controller)
        }
    };

    m.mount(element, component);

    return api(controller);
}

module.exports = init;
module.exports.controller = ctrl;
module.exports.view = view;


