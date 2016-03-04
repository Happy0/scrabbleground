module.exports = function(data) {

  var highlightTypeToClass = {
    newlyPlaced : data.highlightedTilePlacedClass,
    alreadyPlaced : data.highlightedTileAlreadyPlacedClass,
    mainWord: data.highlightMoveMainWordClass,
    bonusSquarePlaced: data.highlightedTileBonusSquareClass
  };

  var highlightMove = function(placedPositions, isHorizontal) {

  };

  var removeAllHighlightedTiles = function() {

  };


  return {
    highlightMove : highlightMove,
    removeAllHighlightedTiles : removeAllHighlightedTiles
  };
};
