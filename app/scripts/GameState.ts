import Move from "./Move";


export default class GameState {
    constructor(
        public board: number[][],
        public player: number,
        public level: number,
        public round: number,
        public numBlackTiles: number,
        public numWhiteTiles: number,
        public numEmptyTiles: number,
        public numBlackPlaced: number,
        public numWhitePlaced: number,
        public possibleMoves: Move[],
        public gameOver: boolean,
        public endReason: string,
        public whiteHistory: ({move: Move | undefined, player: number, round: number})[] = [],
        public blackHistory: ({move: Move | undefined, player: number, round: number})[] = [],
    ){}
}