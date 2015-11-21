var m = require("mithril");
var api = require('./api.js');
var ctrl = require("./ctrl.js");
var view = require ("./view.js");

function init(element, config) {
    var c = new ctrl(config);
    var v = view(c);

    var component = {controller: function() { return c; }, view: function() { return v }} ;

    m.mount(element, component);

    return api(c);
}

module.exports = init;
module.exports.controller = ctrl;
module.exports.view = view;


