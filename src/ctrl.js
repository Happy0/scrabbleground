var d = require("./data");
var view = require("./view");
var m = require("mithril");
var h = require("./highlight");
var b = require("./board");

module.exports = function(cfg) {
    var data = d(cfg);

    var board = b(data);

    var highlight = h(data, board);

    var setSquare = function(x, y, tile) {
      m.startComputation();
      data.board[x - 1][y - 1].tile = tile;
      tile.containingSquare = data.board[x-1][y-1];
      m.endComputation();
    };

    var move = function(placed) {
        placed.forEach(function(place) {
            var x = place.pos.x;
            var y = place.pos.y;
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

    var forEverySquare = board.forEverySquare;

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

    var freezeBoard = function() {
        forEverySquare(function(square) {
            if (square.tile) {
                square.tile.isCandidate = false;
            }
        });
    }

    var setBoardViewOnly = function (viewOnly) {
        data.viewOnly = viewOnly;
        freezeBoard();
    };

    /**
     * Removes any candidate tiles put on to the board and returns all the removed
     * tiles are as an array
     */
    var removeCandidateTiles = function () {
        var removed = [];

        m.startComputation();
        var removeIfCandidate = function (square) {
            if (square.tile && square.tile.isCandidate) {
                square.tile.containingSquare = null;
                removed.push(square.tile);
                square.tile = null;
            };
        };

        forEverySquare(removeIfCandidate);
        m.endComputation();

        return removed;
    }

    var exports =  {
        data : data,
        makeTile : data.makeTile,
        move : move,
        highlight: highlight,
        removeCandidateTiles : removeCandidateTiles,
        setSquare : setSquare,
        getCandidateTiles : getCandidateTiles,
        setBoardViewOnly : setBoardViewOnly,
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
