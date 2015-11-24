var m = require("mithril");
var $ = require("jquery");
require('jquery-ui/draggable')

var columns = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
var rows = columns;

var squareClasses = {
    "N" : 'normal',
    'DL' : 'double-letter',
    'TL' : 'triple-letter',
    'DW' : 'double-word',
    'TW' : 'triple-word'
};

var bonusText = {
    "N" : '',
    'DL' : '2L',
    'TL' : '3L',
    'DW' : '2W',
    'TW' : '3W'
}

// Compute once
var allPositions = (function() {
    var positions = [];
    rows.forEach(function(row) {
        columns.forEach(function(column){
            positions.push([row, column]);
        })
    });

    return positions;
})();

function renderBoard(ctrl) {
    var childrenSquares = [];

    for (var i = 0; i < allPositions.length; i++) {
        // Index from 0
        var x = allPositions[i][0] - 1;
        var y = allPositions[i][1] - 1;
        var squareData = ctrl.data.board[x][y];
        var squareRender = renderSquare(ctrl, x, y, squareData);

        childrenSquares.push(squareRender);
    }

    var attrs = {
        class: 'sg-board'
    };

    return m('div', attrs, childrenSquares);
}

var renderTile = function (ctrl, tile) {
    var letter = tile.letter;
    var value = tile.value;

    var makeDraggable = function(element, initialised, context) {

        // Only candidate tiles (e.g. tiles being played) are draggable.
        if (initialised || !tile.isCandidate) return;

        var startDrag = function() {
            if (tile.containingSquare) {
                // If the tile was dragged from a square on the board,
                // remove the contents of that square. Otherwise, assume
                // it was dragged from a tile rack or similar
                tile.containingSquare.tile = null;
            }

            ctrl.data.draggingTile = tile;
        };

        var stopDrag = function() {
            // Jquery garauntees that event handlers are fired in the order that they were
            // bound, so we can assume that the 'draggingTile' has already been used
            // by the droppable listener
            ctrl.data.draggingTile = null;
        }

        $(element).draggable({start : startDrag, stop: stopDrag});
    };

    return m('div', {config: makeDraggable, class: 'tile letter'}, [
        m('div', {class: 'lettertext'}, letter),
        m('div', {class: 'value'},
            m('subscript', {}, value))
        ]
    )
}

function renderSquare(ctrl, x, y, square) {
    var classes = [squareClasses[square.bonus]];

    var attrs = {
        'data-square-pos-x' : x,
        'data-square-pos-y': y,
        class: classes,
        style : {
            left : x * 6.66667 + '%',
            bottom : y * 6.66667 + '%'
        }
    };

    var textClasses = 'square-text';
    var squareTextDiv = m('div', {class: textClasses}, bonusText[square.bonus]);

    var squareChildren = [squareTextDiv];

    if (square.tile) {
        squareChildren.push(renderTile(ctrl, square.tile));
    }

    // If the square is occupied by the tile, we return the tile as the child
    return m("square", attrs, squareChildren);
}

module.exports = function(ctrl) {

    var attrs = {
        'class' : 'sg-board-wrap'
    };

    return m('div', attrs, renderBoard(ctrl));
}

module.exports.renderTile = renderTile;
