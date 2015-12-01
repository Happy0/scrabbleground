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

    var move = function(placed) {
        placed.forEach(function(place) {
            var x = place.x;
            var y = place.y;
            var tile = place.tile;
            setSquare(x,y,tile);
        })
    };

    var setCustomRevertFunction = function(callback) {
        data.revertFunfction = callback;
    };

    var exports =  {
        data : data,
        makeTile : data.makeTile,
        move : move,
        renderTileAt : null,
        setSquare : setSquare,
        setCustomRevertFunction : setCustomRevertFunction
    };

    exports.renderTileAt = function (tile, selector) {
        var renderTile = view.renderTile(exports, tile);
        m.render(selector, renderTile);
    };

    return exports;
};
