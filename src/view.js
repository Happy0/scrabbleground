var m = require("mithril");

var columns = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
var rows = columns;

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
        var squareRender = renderSquare(x, y, squareData);

        childrenSquares.push(squareRender);
    }

    var attrs = {
        class: 'sg-board'
    };

    return m('div', attrs, childrenSquares);
}

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

function renderSquare(x, y, square) {
    var classes = [squareClasses[square.bonus]];

    var attrs = {
        class: classes,
        style : {
            left : x * 6.66667 + '%',
            bottom : y * 6.66667 + '%'
        }
    };

    var textClasses = ['square-text'];
    var textDiv = m('div', {class: textClasses}, bonusText[square.bonus]);

    return m("square", attrs, textDiv);
}

module.exports = function(ctrl) {
    
    var attrs = {
        'class' : ['sg-board-wrap']
    };

    return m('div', attrs, renderBoard(ctrl));
}
