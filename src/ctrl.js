var d = require("./data");

module.exports = function(cfg) {
    var data = d(cfg);

    var setSquare = function(x, y, tile) {
      data.board[x][y].tile = tile;
    }

    return {
        data : data,
        setSquare : setSquare
    }
};
