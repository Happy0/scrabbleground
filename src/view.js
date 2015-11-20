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
    var children = []

    for (var i = 0; i < allPositions.length; i++) {
        // Index from 0
        var x = allPositions[i][0] - 1;
        var y = allPositions[i][1] - 1;
        var squareData = ctrl.data.board[x][y];
        var squareRender = renderSquare(x, y, squareData);

        children.push(squareRender);
    }

    return children;
}

function renderSquare(x, y, square) {
    var attrs = {
        style : {
            left : x * 6.66667 + '%',
            bottom : y * 6.66667 + '%',
        }
    }

    return m("square", attrs, " [" + x + "]" + "[" + y + "] ");
}

module.exports = function(ctrl) {
    return {
       tag : 'div',
       children : renderBoard(ctrl)
    }
}
