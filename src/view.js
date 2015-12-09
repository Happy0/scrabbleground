var m = require("mithril");
var $ = require("jquery");
require('jquery-ui');

var columns = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
var rows = columns;

var squareClasses = {
    "N" : 'normal',
    'DL' : 'double-letter',
    'TL' : 'triple-letter',
    'DW' : 'double-word',
    'TW' : 'triple-word'
};

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
            ctrl.data.draggingTile = tile;
        };

        var stopDrag = function(event, ui) {
            console.dir(ui.helper.parent());
            var parent = ui.helper.parent();

            console.dir(parent);
            if (tile.containingSquare != null && !parent.hasClass('board-square'))
            {
                // If the tile was dropped onto a square we let the drop handler for the square
                // modify the board accordingly. Otherwise, we assume it was dropped on something
                // like a rack and remove it from its previous square in the model
                var square = tile.containingSquare;
                square.tile = null;
                tile.containingSquare = null;
            }

            // Jquery garauntees that event handlers are fired in the order that they were
            // bound, so we can assume that the 'draggingTile' has already been used
            // by the droppable listener
            ctrl.data.draggingTile = null;
        };

        if (ctrl.data.doubleClickTileHandler)
        {
            $(element).dbclick(doubleClickTileHandler(element));
        }

        var revertHandler = function(droppedOnTo) {
            if($(droppedOnTo).hasClass("board-square")) return false;

            // If the consumer of the library has defined a custom revert function, we first remove
            // the tile from its containing square before calling it
            tile.containingSquare = null;
            return ctrl.data.revertTileHandler(tile, element);
        };

        // If the client has custom behaviour for dropping a candidate tile (such as to put it on a rack),
        // otherwise we send the tile back to where it came from
        var revert = ctrl.data.revertTileHandler ? revertHandler : "invalid";
        $(element).draggable({start : startDrag,
                             stop: stopDrag,
                             revert: revert,
                             snap: ".board-square"});
    };

    return m('div', {config: makeDraggable, class: 'tile letter'}, [
        m('div', {class: 'lettertext'}, letter),
        m('div', {class: 'value'},
            m('subscript', {}, value))
        ]
    );
}

function renderSquare(ctrl, x, y, square) {
    var classes = ['board-square', squareClasses[square.bonus]].join(" ");

    var onDrop = function (event, ui) {
        var tile = ctrl.data.draggingTile;
        ctrl.data.draggingTile = null;
        square.tile = tile;

        if (tile.containingSquare != null)
        {
            tile.containingSquare.tile = null;
        }

        tile.containingSquare = square;

        ui.draggable.detach().appendTo(this);
        ui.draggable.attr("style", "position: relative; left: 0px; top: 0px; z-index: 10;");

        if (ctrl.data.tileDroppedOnSquareListener) {
            ctrl.data.tileDroppedOnSquareListener(tile);
        }

        console.dir(ctrl.data);
     };

    var makeDroppable = function(element, isInitialised, context) {
        if (isInitialised) return;

        $(element).droppable({drop: onDrop, accept: ".tile"});
    };

    var attrs = {
        'data-square-pos-x' : x,
        'data-square-pos-y': y,
        config: makeDroppable,
        class: classes,
        style : {
            left : x * 6.66667 + '%',
            top : y * 6.66667 + '%'
        }
    };

    var textClasses = 'square-text';

    var squareChildren = [];

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
