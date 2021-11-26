export default class Board {
    constructor() {
        // cache dom
        this.gameBoard = document.querySelector("#board"),
        this.cells = document.querySelectorAll(".cell"),
        
        // add event listeners
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.highlightRelaventCells.bind(this))
        })
    }
    
    highlightRelaventCells(e) {
        this.clearHighlightedCells();
        this.highlightColumn(e);
        this.highlightRow(e);
        this.highlightRegion(e);
        e.target.classList.add('highlighted');
    }

    highlightIndividualCell(cell) {
        console.log(cell)
        cell.classList.add('highlighted')
    }

    highlightColumn(e) {
        // find the index of the element that has been clicked on
        // loop through each row and highlight the element of the same index
    }

    highlightRow(e) {
        let row = this.getRow(e);
        row.forEach(cell => {
            this.highlightIndividualCell(cell);
        })
        // find the index of the row that the cell belongs in 
        // highlight the entire row 
    }

    getRow(e) {
        let row = Array.from(e.target.parentNode.childNodes)
        row = row.filter(this.filterOutTextNodes);
        return row;
    }

    filterOutTextNodes(value) {
        return value.nodeType != 3;
    }

    highlightRegion(e) {
        // find the region the element belongs to 
        // fill each of the cells in that region
    }

    cellArrayFill(arrayOfCells) {
        // receives an array of cells and highlights all of them 
    }

    clearHighlightedCells() {
        this.cells.forEach(cell => { cell.classList.remove('highlighted')})
    }
}
