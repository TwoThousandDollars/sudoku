export default class Board {
    constructor() {
        // cache dom
        this.gameBoard = document.querySelector("#board"),
        this.cells = document.querySelectorAll(".cell"),
        this.rows = this.extractRowsFromDocument(),
        this.selectedCell = this.cells[0];
        this.numPad = document.querySelectorAll('.number'),
        this.modeButton = document.querySelector('#modeButton'),
        this.pencilMarkElement = document.createElement('div');
        this.pencilMarkElement.classList.add('pencil-mark--container');
        this.writeMode = 'digit';
        
        // add event listeners
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.updateRelevantCells.bind(this))
        });
        
        this.numPad.forEach(button => {
            button.addEventListener('click', this.insertDigit.bind(this));
        });

        this.modeButton.addEventListener('click', this.toggleMode.bind(this));
        
        // initail board setup 
        this.selectedCell.click();
    }

    toggleMode(e) {
        e.target.innerText = (this.writeMode === 'digit') ? 'Notes: ON' : 'Notes: OFF';
        this.writeMode = (this.writeMode === 'digit') ? 'pencilMark' : 'digit';
    }

    extractRowsFromDocument() {
        let documentRows = document.querySelectorAll('.row');
        let rows = [];
        documentRows.forEach(row => {
            let cleanRow = Array.from(row.childNodes);
            cleanRow = cleanRow.filter(this.filterOutTextNodes);
            rows.push(cleanRow);
        });
        return rows;
    }
    
    updateRelevantCells(e) {
        if (e.target.classList.contains('cell')) {
            this.highlightAllRelevantCells(e)
            this.makeCellSelected(e);
        } else {
            let parentCell = e.target.parentNode;
            parentCell.click();
        }
    }

    makeCellSelected(e) {
        this.clearSelectedCells();
        e.target.classList.add('selected');
        this.selectedCell = e.target;
    }

    clearSelectedCells() {
        this.clearClassFromCells('selected');
    }

    highlightAllRelevantCells(e) {
        this.clearClassFromCells('highlighted');
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
    
    clearClassFromCells(className) {
        this.cells.forEach(cell => { cell.classList.remove(className)})
    }

    insertDigit(e) {
        let digitTextContainerElement = this.selectedCell.childNodes[3];
        let pencilMarkTextContainerElement = this.selectedCell.childNodes[1];
        if (this.writeMode === 'digit') {
            this.clearTextFromElement(pencilMarkTextContainerElement);
            digitTextContainerElement.innerText = e.target.innerText;
        } else {
            this.clearTextFromElement(digitTextContainerElement);
            this.insertPencilMark(e);
        }
    }

    insertPencilMark(e) {
        let numPadDigit = e.target.innerText;
        let pencilMarkElement = this.selectedCell.childNodes[1];
        this.updatePencilMarkElement(numPadDigit,pencilMarkElement);
    }

    updatePencilMarkElement(digit, element) {
        let pencilMarks = element.innerText;
        if (pencilMarks.includes(digit)) {
            element.innerText = pencilMarks.replace(digit, '');
        } else {
            element.innerText += digit;
            this.updateNumericalOrder(element);
        }
    }
    
    updateNumericalOrder(element) {
        element.innerText = element.innerText.split('').sort().join('');
    }

    clearTextFromElement(element) {
        element.innerText = '';
    }
}
