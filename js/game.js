import Board from '/js/board.js';
import Validator from '/js/validator.js';

export default class Game {
    constructor() {
        this.board = new Board();
        this.validator = new Validator(this.board);
    }
}