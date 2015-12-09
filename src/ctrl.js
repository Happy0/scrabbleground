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
        data.revertTileHandler = callback;
    };

    var setTileDroppedOnSquareListener = function(callback) {
        data.tileDroppedOnSquareListener = callback;
    }

    var forEverySquare = function(func) {

        data.board.forEach(function(column, x) {
            column.forEach(function(square, y) {
                func(square, x, y);
            });
        });

    };

    var getCandidateTiles = function() {
        var candidates = [];

        var pushIfCandidate = function(square, x, y) {
            if (square.tile && square.tile.isCandidate) {
                var candidate = {
                    x : x,
                    y : y,
                    tile : square.tile
                };

                candidates.push(candidate);
            }
        }

        forEverySquare(pushIfCandidate);

        return candidates;
    };

    var freezeBoard = function () {
        var freezeIfCandidate = function(square) {
            if (square.tile && square.tile.isCandidate) {
                square.tile.isCandidate = false;
            }
        }

        forEverySquare(freezeIfCandidate);
    };

    var exports =  {
        data : data,
        makeTile : data.makeTile,
        move : move,
        setSquare : setSquare,
        getCandidateTiles : getCandidateTiles,
        freezeBoard : freezeBoard,
        setTileDroppedOnSquareListener : setTileDroppedOnSquareListener,
        setCustomRevertFunction : setCustomRevertFunction
    };


    exports.makeMithrilTile = function(tile) {
        return view.renderTile(exports, tile);
    };

    exports.renderTileAt = function (tile, selector) {
        var renderTile = view.renderTile(exports, tile);
        m.render(selector, renderTile);
    };

    return exports;
};
