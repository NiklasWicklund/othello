import GameState from './GameState';
import Move from './Move';
import utils from './utility';


const weight_board = [
    [120, -20, 20, 5, 5, 20, -20, 120],
    [-20, -40, -5, -5, -5, -5, -40, -20],
    [20, -5, 15, 3, 3, 15, -5, 20],
    [5, -5, 3, 3, 3, 3, -5, 5],
    [5, -5, 3, 3, 3, 3, -5, 5],
    [20, -5, 15, 3, 3, 15, -5, 20],
    [-20, -40, -5, -5, -5, -5, -40, -20],
    [120, -20, 20, 5, 5, 20, -20, 120]
];

export default function getMove(gameState: GameState): Move | undefined {
    /*
        Call function for negamax algorithm

        Parameters:
            gameState: GameState
        
        Returns:
            number[]: [row, col] of the best move
    */
    let depth = gameState.level;
    let alpha = -Infinity;
    let beta = Infinity;
    let result = negamax(gameState, depth, alpha, beta);
    return result.move;

}

function evaluate(gameState: GameState): number {
    /*
        Evaluate the board

        Parameters:
            gameState: GameState
        
        Returns:
            number: score
    */
    let score = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            score += gameState.board[i][j] * weight_board[i][j];
        }
    }
    return score;
}

function isTerminal(gameState: GameState): boolean {
    /*
        Check if the game is over

        Parameters:
            gameState: GameState
        
        Returns:
            boolean: true if game is over, false otherwise
    */
    const blackIsOut = (utils.getPossibleMoves(gameState.board,1).length === 0, gameState.numBlackPlaced === 32)
    const whiteIsOut = (utils.getPossibleMoves(gameState.board,-1).length === 0, gameState.numWhitePlaced === 32)
    return blackIsOut && whiteIsOut;
}
function negamax(gameState: GameState, depth: number, alpha: number, beta: number): {score: number, move: Move | undefined} {
    /*
        Negamax algorithm

        Parameters:
            gameState: GameState
            depth: number
            alpha: number
            beta: number
        
        Returns:
            {score: number, move: number[]}: score and move
    */
    if (depth === 0 || isTerminal(gameState) || gameState.gameOver) {
        return {score: evaluate(gameState)*gameState.player, move: undefined};
    }

    let bestScore = -Infinity;
    let bestMove = undefined;

    for (let move of gameState.possibleMoves) {
        let newState = utils.placeTile(gameState, move);
        if (newState === undefined) {continue;} // Something went wrong, skip this move :)
        newState = utils.flipTiles(newState, move); // Also at the end switch to the next player
        
        let result = negamax(newState, depth - 1, -beta, -alpha);
        let score = -result.score;

        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }

        alpha = Math.max(alpha, score);
        if (alpha >= beta) {
            break;
        }
    }
    return {score: bestScore, move: bestMove};

}