var d = require("./data");
var view = require("./view");
var m = require("mithril");

module.exports = function(cfg) {
    var data = d(cfg);

    var setSquare = function(x, y, tile) {
      data.board[x][y].tile = tile;
      tile.containingSquare = data.board[x][y];
      m.redraw();
    };

    var setCustomRevertFunction = function(callback) {
        data.revertFunfction = callback;
    };

    var renderTileAt = function(tile, selector) {
        var renderTile = view.renderTile(data.ctrl, tile);
        m.render(selector, renderTile);
    };

    var exports =  {
        data : data,
        makeTile : data.makeTile,
        setSquare : setSquare,
        setCustomRevertFunction : setCustomRevertFunction
    };

    return exports;
};
