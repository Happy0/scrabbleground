module.exports = function(data, board) {

  var highlightTypeToClass = {
    newlyPlaced : data.highlightedTilePlacedClass,
    alreadyPlaced : data.highlightedTileAlreadyPlacedClass,
    mainWord: data.highlightMoveMainWordClass,
    bonusSquarePlaced: data.highlightedTileBonusSquareClass
  };

  var getTilesLine = function(x, y, changeX, changeY) {
    var tiles = [];
    x = x + changeX;
    y = y + changeY;

    var nextTile = data.board[x][y].tile;
    while (nextTile) {
      tiles.push(nextTile);
      x = x + changeX;
      y = y + changeY;

      var square = data.board[x][y];
      if (square && square.tile) {
        nextTile = square.tile;
      }
      else {
        nextTile = null;
      }
    }

    return tiles;
  };

  var getTilesAheadOf = function(x, y, direction) {
      if (direction == "horizontal") {
        return getTilesLine(x, y, 1, 0)
      } else {
        return getTilesLine(x, y, 0, 1)
      }
  };

  var getTilesBehind = function(x, y, direction) {
    if (direction == "horizontal") {
      return getTilesLine(x, y, -1, 0);
    } else {
      return getTilesLine(x, y, 0, -1);
    }
  };

  var getContiguousTiles = function(direction, startPosition) {
    var startX = startPosition.x - 1;
    var startY = startPosition.y - 1;

    var startTile = data.board[startX][startY].tile;

    var behindStartTile = getTilesAheadOf(startX, startY, direction);
    var aheadStartTile = getTilesBehind(startX, startY, direction);

    return [].concat(behindStartTile).concat([startTile]).concat(aheadStartTile);
  };

  var highlightMove = function(placedMoveSummary) {
    var placed = placedMoveSummary.placed;
    var direction = placedMoveSummary.direction;

    var mainWord = getContiguousTiles(direction, placed[0]);

    mainWord.forEach(function(tile) {
      tile.highlightClasses = highlightTypeToClass[mainWord];
    });
  };

  var removeAllHighlightedTiles = function() {
    var removeHighlight = function (square) {
      if (square.tile) {
        delete square.tile.highlightClass;
      }
    };

    board.forEverySquare(removeHighlight);
  };

  return {
    highlightMove : highlightMove,
    removeAllHighlightedTiles : removeAllHighlightedTiles
  };
};
