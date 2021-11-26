export default class Board {
    constructor() {
        // cache dom
        this.gameBoard = document.querySelector("#board"),
        this.cells = document.querySelectorAll(".cell"),
        this.documentRows = document.querySelectorAll('.row'),
        this.rows = [],
        
        // add event listeners
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.highlightRelaventCells.bind(this))
        })

        this.documentRows.forEach(row => {
            let cleanRow = Array.from(row.childNodes);
            cleanRow = cleanRow.filter(this.filterOutTextNodes);
            this.rows.push(cleanRow);
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
        cell.classList.add('highlighted')
    }

    highlightColumn(e) {
        // find the index of the element that has been clicked on
        // loop through each row and highlight the element of the same index
        let column = this.getColumn(e);
        column.forEach(cell => {
            this.highlightIndividualCell(cell);
        })
    }

    getColumn(e) {
        let columnNumber = this.getRow(e).indexOf(e.target)
        let column = [];
        this.rows.forEach(row => {
            column.push(row[columnNumber]);
        });
        return column;
        // find the row where the cell is in
        // find the index of the cell within that row

    }

    highlightRow(e) {
        let row = this.getRow(e);
        row.forEach(cell => {
            this.highlightIndividualCell(cell);
        })
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
