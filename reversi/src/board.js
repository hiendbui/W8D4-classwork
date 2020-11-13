// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let grid = [];

  for (let i = 0; i < 8; i++) {
    let sub = new Array(8);
    grid.push(sub);
  };

  grid[3][4] = new Piece('black');
  grid[4][3] = new Piece('black');
  grid[3][3] = new Piece('white');
  grid[4][4] = new Piece('white');

  return grid
}

/**
 * Constructs a Board with a starting grid set up.
 */


function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */   array = [2,1]
Board.prototype.isValidPos = function (pos) {
  let isValid = true
  pos.forEach( function(val){ 
    if(val<0 ||val>7){ isValid = false};
  });
  return isValid;
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
//throw new Error(string)
Board.prototype.getPiece = function (pos) {
   if(!this.isValidPos(pos)){
    throw  new Error ("Not valid pos!"); 
   }
  return this.grid[pos[0]][[pos[1]]]

};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  let x = pos[0];
  let y = pos[1];
  return this.grid[x][y] && this.grid[x][y].color === color;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return !!this.grid[pos[0]][pos[1]]
  // return this.isValidPos(pos) && this.getPiece(pos) !== null;
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function(pos, color, dir, piecesToFlip){
  piecesToFlip ||= [];
  const posCheck = pos;
  posCheck[0] += dir[0];
  posCheck[1] += dir[1];

  if (!this.isValidPos(posCheck)|| !this.isOccupied(posCheck)){
    return [];
  } else if (this.isMine(posCheck,color)) {
    return piecesToFlip;
  } else {
    piecesToFlip.push([...posCheck]);
  }

  return this._positionsToFlip(posCheck,color,dir,piecesToFlip);
  // let done = false 
  // let posCheck = pos
  // while(!done){
  //   posCheck[0] += dir[0];
  //   posCheck[1] += dir[1];
  //   if (!this.isValid(posCheck)|| !this.isOccupied(posCheck)){return []}
  // }
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)) {
    return false;
  } else {
    for(i = 0;i < Board.DIRS.length; i++) {
      if (this._positionsToFlip(pos,color, Board.DIRS[i]).length) {
        return true
      }
    }
    
  }
  return false
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
};



/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};




/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};


// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE