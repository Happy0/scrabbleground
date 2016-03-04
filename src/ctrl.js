var d = require("./data");
var view = require("./view");
var m = require("mithril");

module.exports = function(cfg) {
    var data = d(cfg);

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

    var highlightMove = function(placedPositions, isHorizontal) {

    };

    var removeAllHighlightedTiles = function() {

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
        highlightMove,
        removeAllHighlightedTiles,
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
