
export class Matrix {

    private readonly matrix: Array<Array<number>>;
    private readonly matrixSize: number;


    constructor(...args: Array<Array<number>>) {

        const matrixSize = args.length; // number of rows

        if ( matrixSize < 2 ) {
            throw new Error('The matrix size must be at least 2.');
        }

        for ( const row of args) {
            if ( row.length !== matrixSize + 1) {
                throw new Error(`'Invalid number of numbers in the matrix row. Must be: ${matrixSize}, got: ${row.length}. Row: 
                    \n ${row}`);
            }
        }

        this.matrix = args;
        this.matrixSize = matrixSize;

    }


    public getColumn( columnNumber: number): Array<number> {

        if ( columnNumber > this.matrix[0].length - 1) {
            throw new Error('Column number must not be greater the number of columns' +
                ' in the matrix minus one.');
        }

        const column: Array<number> = new Array<number>();

        for ( let i = 0; i < this.matrixSize; i++ ) {
            column.push( this.matrix[i][columnNumber]);
        }

        return column;
    }

    public getLastColumn(): Array<number> {
        return this.getColumn(this.matrixSize);
    }


    public setColumn(column: Array<number>, columnIndex: number): void {

        if ( columnIndex > this.matrix[0].length - 1 ) {
            throw new Error('Column index can\'t be more than number of columns.');
        }

        if ( column.length != this.matrix.length ) {
            throw new Error('Column length must be the same as the matrix\'s' +
                ' ones.');
        }

        for ( let i = 0; i < column.length; i ++ ) {
            this.matrix[i][columnIndex] = column[i];
        }
    }


    public clone(): Matrix {
        const clonedMatrix: Array<Array<number>> = new Array<Array<number>>();

        for ( const row of this.matrix ) {
            const clonedRow: Array<number> = new Array<number>();
            for ( const el of row ) {
                clonedRow.push(el);
            }
            clonedMatrix.push(clonedRow);
        }

        return new Matrix(...clonedMatrix);
    }


    public getMatrix(): Array<Array<number>> {
        return this.matrix;
    }


    public getMatrixSize(): number {
        return this.matrixSize;
    }
}