import Board from '/js/board.js'

export default class Game {
    constructor() {
        this.board = new Board();
        console.log(this.board);
    }
}