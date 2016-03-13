module.exports = function(data, board) {

  var highlightTypeToClass = {
    newlyPlaced : data.highlightedTilePlacedClass,
    alreadyPlaced : data.highlightedTileAlreadyPlacedClass,
    mainWord: data.highlightMoveMainWordClass,
    bonusSquarePlaced: data.highlightedTileBonusSquareClass
  };

  var getContiguousTiles = function(direction, startPosition) {
    var currentX = startPosition.x;
    var currentY = startPosition.y;

    var incrementerInDirection = function () {
      if (direction === "horizontal") {
        currentX += 1;
      } else {
        currentY +=1;
      }
    }

    var decrementerInDirection = function () {
      if (direction === "horizontal") {
        currentX -= 1;
      }
      else {
        currentY -=1;
      }
    }

    var tiles = [];

    var walkAndPushTilesInDirection = function(incremeneterOrDecrementerFunction) {
      // Reset and go in the other direction
      currentX = startPosition.x;
      currentY = startPosition.y;

      do {
        var currentTile = data.board[x][y].tile;
        tiles.push(currentTile);

        incremeneterOrDecrementerFunction();

      } while (currentTile);
    };

    walkAndPushTilesInDirection(incrementerInDirection);
    walkAndPushTilesInDirection(decrementerInDirection);

    return tiles;
  };

  var highlightMove = function(placedMoveSummary) {
    var placed = placedMoveSummary.placed;
    var direction = placedMoveSummary.direction;

    var mainWord = getContiguousFiles(direction, placed[0]);

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
