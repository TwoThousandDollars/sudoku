export default class Board {
    constructor() {
        // cache dom
        this.gameBoard = document.querySelector("#board"),
        this.cells = document.querySelectorAll(".cell"),
        this.rows = this.extractRowsFromDocument(),
        this.columns = this.extractColumnsFromDocument(),
        this.regions = this.extractRegionsFromDocument(),
        this.selectedCell = this.cells[0],
        this.numPad = document.querySelectorAll('.number'),
        this.modeButton = document.querySelector('#modeButton'),
        this.pencilMarkElement = document.createElement('div'),
        this.pencilMarkElement.classList.add('pencil-mark--container'),
        this.writeMode = 'digit',
        
        // add event listeners
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.updateRelevantCells.bind(this))
        }),
        
        this.numPad.forEach(button => {
            button.addEventListener('click', this.insertDigit.bind(this))
        }),

        this.modeButton.addEventListener('click', this.toggleMode.bind(this)),
        
        // initail board setup 
        this.selectedCell.click();
    }

    toggleMode(e) {
        e.target.innerText = (this.writeMode === 'digit') ? 'Notes: ON' : 'Notes: OFF';
        this.writeMode = (this.writeMode === 'digit') ? 'pencilMark' : 'digit';
    }

    extractRegionsFromDocument() {
        let regionCells = this.getElementFromEachRegion();
        let regions = [];
        regionCells.forEach(cell => {
            regions.push(this.getRegion(cell));
        });
        return regions;
    }

    getElementFromEachRegion() {
        let regionArray = [];
        for (let i=1;i<=9;i++) {
            let regionNumber = 'region-'.concat(i.toString());
            regionArray.push(document.getElementsByClassName(regionNumber)[0])
        }
        return regionArray;
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

    extractColumnsFromDocument() {
        let columns = [];
        this.rows[0].forEach(cell => {
            columns.push(this.getColumn(cell));
        });
        return columns;
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
        let element = e.target;
        this.clearClassFromCells('highlighted');
        this.highlightColumn(element);
        this.highlightRow(element);
        this.highlightRegion(element);
    }

    highlightColumn(element) {
        let column = this.getColumn(element);
        this.highlightAllCells(column);
    }
    
    getColumn(element) {
        let columnNumber = this.getRow(element).indexOf(element)
        let column = [];
        this.rows.forEach(row => {
            column.push(row[columnNumber]);
        });
        return column;
    }
    
    highlightRow(element) {
        let row = this.getRow(element);
        this.highlightAllCells(row);
    }
    
    getRow(element) {
        let row = Array.from(element.parentNode.childNodes)
        row = row.filter(this.filterOutTextNodes);
        return row;
    }
    
    filterOutTextNodes(value) {
        return value.nodeType != 3;
    }
    
    highlightRegion(element) {
        let region = this.getRegion(element);
        this.highlightAllCells(region);
    }
    
    getRegion(element) {
        let regionNumber = this.getRegionNumber(element);
        let region = document.getElementsByClassName(regionNumber);
        return Array.from(region);
    }
    
    getRegionNumber(element) {
        let cellClasses = Array.from(element.classList);
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
