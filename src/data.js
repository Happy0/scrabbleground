var configure = require("./configure")

var squareBonuses =
        [["TW","N","N","DL","N","N","N","TW","N","N","N","DL","N","N","TW"]
       ,["N","DW","N","N","N","TL","N","N","N","TL","N","N","N","DW","N"]
       ,["N","N","DW","N","N","N","DL","N","DL","N","N","N","DW","N","N"]
       ,["DL","N","N","DW","N","N","N","DL","N","N","N","DW","N","N","DL"]
       ,["N","N","N","N","DW","N","N","N","N","N","DW","N","N","N","N"]
       ,["N","TL","N","N","N","TL","N","N","N","TL","N","N","N","TL","N"]
       ,["N","N","DL","N","N","N","DL","N","DL","N","N","N","DL","N","N"]
       ,["TW","N","N","DL","N","N","N","DW","N","N","N","DL","N","N","TW"]
       ,["N","N","DL","N","N","N","DL","N","DL","N","N","N","DL","N","N"]
       ,["N","TL","N","N","N","TL","N","N","N","TL","N","N","N","TL","N"]
       ,["N","N","N","N","DW","N","N","N","N","N","DW","N","N","N","N"]
       ,["DL","N","N","DW","N","N","N","DL","N","N","N","DW","N","N","DL"]
       ,["N","N","DW","N","N","N","DL","N","DL","N","N","N","DW","N","N"]
       ,["N","DW","N","N","N","TL","N","N","N","TL","N","N","N","DW","N"]
       ,["TW","N","N","DL","N","N","N","TW","N","N","N","DL","N","N","TW"]];

var makeTile = function(letter, value, isCandidate) {
    var tile = {
        letter : letter,
        value : value
    };

    // Candidate tiles have not yet been committed and can be moved freely about
    // the board
    if (isCandidate) {
        tile.isCandidate = true;
    }

    return tile;
}

var makeSquare = function(tile, bonus) {
    var square = {
        "tile" : tile,
        "bonus" : bonus
    };

    if (tile) {
        tile.containingSquare = square;
    }

    return square;
}

/**
 *  Create an empty board
 */
var board = squareBonuses.map(function (row) {
    return row.map(function(bonus) {
        return makeSquare(null, bonus);
    })
});

module.exports = function (cfg) {

    var defaults = {
        board : board,
        viewOnly : false, // e.g. spectating or not the user's turn
        draggingTile : null, // The tile  that is currently being dragged,
        tileDroppedOnSquareListener : null,
         // An optional custom function for determining where a tile goes when it is picked
         // up from a square and dropped outside the board
         revertTileHandler: null,
         highlightedTilePlacedClass : null, // The class to use to highlight a placed tile when a move is highllighted
         highlightedTileAlreadyPlacedClass : null, // The class to use to highlight a tile that was already on the board when a move is placed.
         highlightMoveMainWordClass: null, // The class to use to highlight the main word created when highlighting a move
         highlightedTileBonusSquareClass, null // The class to use to make apparent that a tile placed on a move was over a bonus square
    };

    // Merge any specified configuration values with our defaults before returning
    // the defaults
    configure(defaults, cfg || {});

    return defaults;
}
