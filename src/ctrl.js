var d = require("./data");
var m = require("mithril");

module.exports = function(cfg) {
    var data = d(cfg);

    var setSquare = function(x, y, tile) {
      data.board[x][y].tile = tile;
      tile.containingSquare = data.board[x][y];
      m.redraw();
    };

    var move = function(placed) {
        tiles.forEach(function(placed){
            var x = placed.x;
            var y = placed.y;

            setSquare(x,y,placed.tile);
        });

        // If it was our move, then we remove the 'isCandidate' property
        // from our placed tiles
        freezeBoard();
    };

    /**
     * Should be called to make the tiles on the board no longer movable when
     * the user's move has been finalised.
     */
    var freezeBoard = function() {
        data.board.forEach(function(column) {
            column.forEach(function(square) {
                if (square.tile) {
                    square.tile.isCandidate = false;
                }
            })
        })
    };

    var exports =  {
        data : data,
        setSquare : setSquare,
        freezeBoard : freezeBoard,
        move : move
    };

    return exports;
};
