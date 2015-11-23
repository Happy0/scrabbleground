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
    return {
        "tile" : tile,
        "bonus" : bonus
    };
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
        currentlyDragging : null // The piece that is currently being dragged e.g. [0,3]
    };

    // Merge any specified configuration values with our defaults before returning
    // the defaults
    configure(defaults, cfg || {});

    return defaults;
}

