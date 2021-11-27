export default class Validator {
    constructor(board) {
        this.board = board;
        this.errorMessage = "Something doesn't look right";
        this.successMessage = "Zero errors detected";

        // cache dom 
        this.validateButton = document.querySelector('#validate');

        // add event listeners 
        this.validateButton.addEventListener('click', this.validate.bind(this));
    }

    validate() {
        let rows = this.board.rows
        let columns = this.board.columns;
        let regions = this.board.regions;
        
        if (this.validateCellGroup(rows) && 
        this.validateCellGroup(columns) && 
        this.validateCellGroup(regions)) {
            alert(this.successMessage);
        } else {
            alert(this.errorMessage);
        }

    }

    validateCellGroup(array) {
        let results = [];
        array.forEach(group => {
            if (this.containsDuplicates(group)) {
                results.push(false);
            } else {
                results.push(true)
            }
        });
        if (results.includes(false)) return false;
        return true;
    }

    // removes blank cells from the array that gets validated 
    trimCellGroup(array) {
        let trimmedGroup = array.filter(this.getEmptyCells);
        return trimmedGroup;
    }

    getEmptyCells(cellGroup) {
        return cellGroup.childNodes[3].innerText !== '';
    }

    // returns true if the array contains duplicates 
    containsDuplicates(a) {
        let array = this.trimCellGroup(a);
        let cellValues = [];
        array.forEach(cell => {
            cellValues.push(cell.childNodes[3].innerText);
        })
        let result = (new Set(cellValues)).size !== cellValues.length;
        return result;
    }
}