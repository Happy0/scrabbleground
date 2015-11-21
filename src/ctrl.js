var d = require("./data");
var m = require("mithril");

module.exports = function(cfg) {
    var data = d(cfg);

    var setSquare = function(x, y, tile) {
      m.startComputation();
      data.board[x][y].tile = tile;
      console.dir(data.board);
      m.endComputation();
    }

    var exports =  {
        data : data,
        setSquare : setSquare
    };

    return exports
};
