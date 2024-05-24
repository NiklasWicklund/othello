import getMove from "./AI";
import GameState from "./GameState";
import Move from "./Move";
import utils from "./utility";


export default class Game {
    private gameState: GameState;
    public playingAs: number | null = null;
    constructor(
    ){
        this.gameState = this.initalizeGameState();
    }

    private initalizeGameState(): GameState {
        let board : number[][] = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, -1, 1, 0, 0, 0],
            [0, 0, 0, 1, -1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];

        const [numBlack, numWhite, numEmpty] = utils.countTiles(board);
        const gameState = new GameState(
            board,
            0, // player
            3, // level, placeholder as this will be set when starting the game
            0, // round
            numBlack, // numBlackTiles
            numWhite, // numWhiteTiles
            numEmpty, // numEmptyTiles
            2, // numBlackPlaced
            2, // numWhitePlaced
            utils.getPossibleMoves(board, 1), // possibleMoves
            false, // gameOver,
            '',
            [], // whiteHistory,
            [] // blackHistory
            );
        return gameState;
    }
    
        
    

    public getGameState(): GameState {
        return {...this.gameState} // return a copy of the gameState
    }

    public startGame(playingAs : number, level:number): void {
        this.playingAs = playingAs;
        this.gameState = this.initalizeGameState();
        this.gameState.level = level;
        this.gameState.player = -1;
        this.gameState = utils.nextPlayer(this.gameState);

        if(playingAs === -1) {
            // AI starts, make a move
        }

    }

    public placeTile(move: Move | undefined = undefined): Move | undefined{
        if(move !== undefined){
            let newState = utils.placeTile(this.gameState, move);
            this.gameState = newState;
            return move;
        }else{
            let aiMove = getMove(this.gameState);
            if(aiMove === undefined){
                this.gameState = utils.nextPlayer(this.gameState);
                return;
            }
            // AI move
            let newState = utils.placeTile(this.gameState, aiMove);
            this.gameState = newState;
            return aiMove;
        }
    }

    public flipTiles(move: Move): void {
        let newState = utils.flipTiles(this.gameState, move);
        this.gameState = newState;
    }
}