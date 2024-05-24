export default class Move {
    /*
        Move class

        Attributes:
            row: number, row of the move
            col: number, column of the move
            dirs: number[][], list of directions to flip tiles, each direction is a list [dx, dy]
    */
    constructor(
        public row: number,
        public col: number,
        public dirs: number[][]
        ) {}
}