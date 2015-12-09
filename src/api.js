

module.exports = function(controller) {
    return {
        move : controller.move,
        makeTile : controller.makeTile,
        renderTileAt : controller.renderTileAt,
        setSquare : controller.setSquare,
        getCandidateTiles : controller.getCandidateTiles,
        freezeBoard : controller.freezeBoard,
        setTileDroppedOnSquareListener : controller.setTileDroppedOnSquareListener,
        setCustomRevertFunction : controller.setCustomRevertFunction
    };
}
