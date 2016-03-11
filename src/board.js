module.exports = function (data) {

  var forEverySquare = function(func) {

      data.board.forEach(function(column, x) {
          column.forEach(function(square, y) {
              func(square, x, y);
          });
      });

  };

  return {
    forEverySquare : forEverySquare
  }
};
