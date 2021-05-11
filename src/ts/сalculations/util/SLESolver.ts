import { Matrix } from '@ts/сalculations/util/Matrix';


export  class SLESolver {

    public static solve(matrix: Matrix): SLESolverResult {

        if ( matrix.getMatrixSize() != 3) {
            throw new Error('Sorry, I\'m too dull to solve any matrix containing not 3' +
                ' variables.');
        }

        const rates = matrix.getLastColumn();
        let clonedMatrix = matrix.clone();
        const d = this.findDeterminant(clonedMatrix);

        clonedMatrix.setColumn(rates, 0);
        const dA = this.findDeterminant(clonedMatrix);
        clonedMatrix = matrix.clone();
        clonedMatrix.setColumn(rates, 1);

        const dB = this.findDeterminant(clonedMatrix);
        clonedMatrix = matrix.clone();
        clonedMatrix.setColumn(rates, 2);
        const dC = this.findDeterminant(clonedMatrix);

        return new SLESolverResult(
            dA / d, dB / d, dC / d
        );

    }

    private static findDeterminant(matrix: Matrix) {
        const matrixx = matrix.getMatrix();
        return (
              matrixx[0][0] * matrixx[1][1] * matrixx[2][2]
            + matrixx[0][1] * matrixx[1][2] * matrixx[2][0] +
              matrixx[0][2] * matrixx[1][0] * matrixx[2][1] -
              matrixx[0][2] * matrixx[1][1] * matrixx[2][0] -
              matrixx[0][1] * matrixx[1][0] * matrixx[2][2] -
              matrixx[0][0] * matrixx[1][2] * matrixx[2][1]
        );
    }




}

export class SLESolverResult {

    public readonly a: number;
    public readonly b: number;
    public readonly c: number;

    constructor(a: number, b: number, c: number) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}