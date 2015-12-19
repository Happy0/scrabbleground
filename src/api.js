

module.exports = function(controller) {
    return {
        move : controller.move,
        makeTile : controller.makeTile,
        renderTileAt : controller.renderTileAt,
        setSquare : controller.setSquare,
        getCandidateTiles : controller.getCandidateTiles,
        setBoardViewOnly : controller.setBoardViewOnly,
        setTileDroppedOnSquareListener : controller.setTileDroppedOnSquareListener,
        setCustomRevertFunction : controller.setCustomRevertFunction
    };
}
