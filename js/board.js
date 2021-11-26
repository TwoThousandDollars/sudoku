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
    }

    
    highlightColumn(e) {
        let column = this.getColumn(e);
        this.highlightAllCells(column);
    }
    
    getColumn(e) {
        let columnNumber = this.getRow(e).indexOf(e.target)
        let column = [];
        this.rows.forEach(row => {
            column.push(row[columnNumber]);
        });
        return column;
    }
    
    highlightRow(e) {
        let row = this.getRow(e);
        this.highlightAllCells(row);
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
        let region = this.getRegion(e);
        this.highlightAllCells(region);
    }
    
    getRegion(e) {
        let regionNumber = this.getRegionNumber(e);
        let region = document.getElementsByClassName(regionNumber);
        return Array.from(region);
    }
    
    getRegionNumber(e) {
        let cellClasses = Array.from(e.target.classList);
        let re = /region\-\d/;
        let regionNumber = cellClasses.find(value => re.test(value));
        return regionNumber;
    }
    
    highlightAllCells(arrayOfCells) {
        arrayOfCells.forEach(cell => {
            this.highlightIndividualCell(cell);
        })
    }
    
    highlightIndividualCell(cell) {
        cell.classList.add('highlighted')
    }
    clearHighlightedCells() {
        this.cells.forEach(cell => { cell.classList.remove('highlighted')})
    }
}
