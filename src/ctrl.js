var d = require("./data");
var m = require("mithril");

module.exports = function(cfg) {
    var data = d(cfg);

    var setSquare = function(x, y, tile) {
      data.board[x][y].tile = tile;
      m.redraw();

      data.board[x][y].bonus="baws";
      console.dir(data.board);
    }

    var exports =  {
        data : data,
        setSquare : setSquare
    };

    return exports
};
