module.exports = function(data, board) {

  var highlightTypeToClass = {
    newlyPlaced : data.highlightedTilePlacedClass,
    alreadyPlaced : data.highlightedTileAlreadyPlacedClass,
    mainWord: data.highlightMoveMainWordClass,
    bonusSquarePlaced: data.highlightedTileBonusSquareClass
  };

  var highlightMove = function(placedMoveSummary) {

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
