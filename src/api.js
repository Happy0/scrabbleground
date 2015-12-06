

module.exports = function(controller) {
    return {
        move : controller.move,
        makeTile : controller.makeTile,
        renderTileAt : controller.renderTileAt,
        setSquare : controller.setSquare,
        getCandidateTiles : controller.getCandidateTiles,
        freezeBoard : controller.freezeBoard,
        setCustomRevertFunction : controller.setCustomRevertFunction
    };
}
