import GameState from "./GameState";
import Move from "./Move";

function copyState(gameState: GameState): GameState {
    /*
        Copy the gameState object

        Parameters:
            gameState: GameState
        
        Returns:
            GameState: copied gameState object
    */
    return new GameState(
        gameState.board.map(row => row.slice()),
        gameState.player,
        gameState.level,
        gameState.round,
        gameState.numBlackTiles,
        gameState.numWhiteTiles,
        gameState.numEmptyTiles,
        gameState.numBlackPlaced,
        gameState.numWhitePlaced,
        gameState.possibleMoves.map(move => new Move(move.row, move.col, move.dirs.slice())),
        gameState.gameOver,
        gameState.endReason,
        gameState.whiteHistory.slice(),
        gameState.blackHistory.slice(),
    );
}
function hasAdjacentOpponent(gameState: GameState, pos: number[]): boolean {
    /*
        Check if there is an adjacent opponent cell

        Parameters:
            gameState: GameState
            pos: number[]

        Returns:
            boolean: true if there is an adjacent opponent cell, false otherwise
    */
    const [i, j] = pos;
    let directions = [
        [0, 1], [0, -1], [1, 0], [-1, 0],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];
    for (let d of directions) {
        let [dx, dy] = d;
        let x = i + dx, y = j + dy;
        if (!inBounds(x, y)) continue;
        if (gameState.board[x][y] === -gameState.player) {
            return true;
        }
    }
    return false;
}
function getDirectionalFlips(board: number[][], pos: number[], player: number): number[][] {

    /*
        Get the directions to flip tiles

        Parameters:
            board: number[][], current game board
            pos: number[], position of the placed tile
            player: number, sent seperately as to allow for checking of possible moves for both players
                    independent from the current gameState and player
        
        Returns:
            number[][]: list of directions to flip tiles, each direction is a list [dx, dy]
    */
    let dirs = [];
    const [i, j] = pos;
    let directions = [
        [0, 1], [0, -1], [1, 0], [-1, 0],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];
    for (let d of directions) {
        let [dx, dy] = d;
        let x = i + dx, y = j + dy;
        let found = false;
        if(!inBounds(x,y)) continue;

        // The adjacent cell should be the opponent's cell
        let isOpponentCell = board[x][y] === player * -1;
        if (!isOpponentCell) continue;
        while (inBounds(x, y)) {
            if (board[x][y] === 0) break;
            if (board[x][y] === player) {
                // Found a player cell, flip the opponent's cells in this direction
                found = true;
                break;
            }
            x += dx;
            y += dy;
        }
        if (found){
            dirs.push([dx, dy]);
        }
    }
    return dirs;
}
function countTiles(board: number[][]): [number, number, number] {
    /*
        Count the number of black, white and empty tiles

        Parameters:
            board: number[][], current game board
        
        Returns:
            [number, number, number]: number of black, white and empty tiles
    */
    let numBlack = 0, numWhite = 0, numEmpty = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] === 1) {
                numBlack++;
            } else if (board[i][j] === -1) {
                numWhite++;
            } else {
                numEmpty++;
            }
        }
    }
    return [numBlack, numWhite, numEmpty];
}
function getPossibleMoves(board: number[][], player: number): Move[] {
    /*
        Get all possible moves for the current player

        Parameters:
            board: number[][], current game board
            player: number, current player
        
        Returns:
            Move[]: list of possible moves, each move is a Move object
    */
    let possibleMoves = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] !== 0) continue;
            let dirs = getDirectionalFlips(board, [i, j], player);
            if (dirs.length > 0) {
                possibleMoves.push(new Move(i, j, dirs));
            }
        }
    }
    return possibleMoves;
}

function isMoveValid(gameState: GameState, move: Move): boolean {
    return gameState.possibleMoves.some(m => m.row === move.row && m.col === move.col);
}
function placeTile(gameState: GameState, move: Move): GameState {
    /*
        Place a tile on the board

        Parameters:
            gameState: GameState
            move: Move object

        Returns:
            GameState: new gameState object, null if move is invalid / not possible
    */

    const newState = copyState(gameState);

    // Make sure the move is valid
    if (!isMoveValid(gameState, move)) {
        // Throw an error
        new Error("Invalid move");
    }

    // Place the tile
    newState.board[move.row][move.col] = gameState.player;
    if(gameState.player === 1){
        newState.blackHistory.push({move: move, player: gameState.player, round: gameState.round});
    }
    else{
        newState.whiteHistory.push({move: move, player: gameState.player, round: gameState.round});
    }
    newState.numEmptyTiles--;
    if (gameState.player === 1) {
        newState.numBlackPlaced++;
        newState.numBlackTiles++;
    } else {
        newState.numWhitePlaced++;
        newState.numWhiteTiles++;
    }
    return newState;
}

function inBounds(i: number, j: number): boolean {
    /*
        Check if the cell is in bounds

        Parameters:
            i: number
            j: number

        Returns:
            boolean: true if cell is in bounds, false otherwise
    */
    return i >= 0 && i < 8 && j >= 0 && j < 8;
}

function numPlacedTiles(gameState: GameState,player: number): number {
    if(player === 1) {
        return gameState.numBlackPlaced;
    }else if(player === -1) {
        return gameState.numWhitePlaced;
    }else{
        return 0;
    }
}
function nextPlayer(gameState: GameState): GameState {
    /*
        Switch to the next player

        Parameters:
            gameState: GameState

        Returns:
            GameState: gameState object
    */
    gameState.endReason = '';
    gameState.player = -gameState.player;
    gameState.round++;
    gameState.possibleMoves = getPossibleMoves(gameState.board, gameState.player);
    if (gameState.possibleMoves.length === 0 || numPlacedTiles(gameState,gameState.player) === 32){
        // Skip the player's turn
        if(gameState.player === 1){
            gameState.blackHistory.push({move: undefined, player: gameState.player, round: gameState.round}); // Add a placeholder for the move as the player skipped their turn
        }
        else{
            gameState.whiteHistory.push({move: undefined, player: gameState.player, round: gameState.round}); // Add a placeholder for the move as the player skipped their turn
        }
        gameState.player = -gameState.player;
        gameState.round++;
         
        gameState.possibleMoves = getPossibleMoves(gameState.board, gameState.player);

        // Check if the other player can play
        if (gameState.possibleMoves.length === 0 || numPlacedTiles(gameState,gameState.player) === 32) {
            // Game over
            if(gameState.player === 1){
                gameState.blackHistory.push({move: undefined, player: gameState.player, round: gameState.round}); // Add a placeholder for the move as the player skipped their turn
            }
            else{
                gameState.whiteHistory.push({move: undefined, player: gameState.player, round: gameState.round}); // Add a placeholder for the move as the player skipped their turn
            }
            gameState.endReason = "No possible moves for both players";
            gameState.gameOver = true;
        }
    }
    
    return gameState;
}
function flipTiles(gameState: GameState, move: Move): GameState {
    /*
        Flip tiles on the board

        Parameters:
            gameState: GameState
            move: Move[]

        Returns:
            GameState: new gameState object
    */

    let newState = copyState(gameState);

    // Flip the tiles
    for (let d of move.dirs) {
        let [dx, dy] = d;
        let x = move.row + dx, y = move.col + dy;
        while (newState.board[x][y] !== newState.player) {
            newState.board[x][y] = newState.player;

            // Update the number of tiles, score
            if (newState.player === 1) {
                newState.numBlackTiles++;
                newState.numWhiteTiles--;
            } else {
                newState.numWhiteTiles++;
                newState.numBlackTiles--;
            }
            x += dx;
            y += dy;
        }
    }
    newState = nextPlayer(newState);
    return newState;
}


function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const minutesString = minutes > 0 ? `${minutes}m` : ``;
    return `${minutesString} ${remainingSeconds}s`;
}

export default {
    copyState,
    hasAdjacentOpponent,
    getDirectionalFlips,
    getPossibleMoves,
    isMoveValid,
    placeTile,
    inBounds,
    flipTiles,
    nextPlayer,
    formatTime,
    countTiles
}