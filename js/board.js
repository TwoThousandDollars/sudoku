export default class Board {
    constructor() {
        // cache dom
        this.gameBoard = document.querySelector("#board"),
        this.cells = document.querySelectorAll(".cell"),
        
        // add event listeners
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.highlightCells.bind(this))
        })
    }
    
    highlightCells(e) {
        this.clearHighlightedCells();
        this.highlightColumn();
        this.highlightRow();
        this.highlightArea();
        e.target.classList.add('highlighted');
    }

    highlightColumn() {

    }

    highlightRow() {

    }

    highlightArea() {
        
    }

    clearHighlightedCells() {
        this.cells.forEach(cell => { cell.classList.remove('highlighted')})
    }
}
