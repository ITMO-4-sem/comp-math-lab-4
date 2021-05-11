import { Table } from '@ts/сalculations/Table';
import { SLESolver } from '@ts/сalculations/util/SLESolver';
import { Matrix } from '@ts/сalculations/util/Matrix';
import { ApproximationResultExtended } from '@ts/сalculations/approximation/approximationresult/ApproximationResultExtended';
import { Approximation } from '@ts/сalculations/approximation/Approximation';


export class QuadraticApproximation extends Approximation {

    public approximate( table: Table ): ApproximationResultExtended {


        let sx = 0;
        let sxx = 0;
        let sxxx = 0;
        let sxxxx = 0;

        let sy = 0;
        let sxy = 0;
        let sxxy = 0;

        const xValues = table.getXValues();
        const yValues = table.getYValues();

        const n = xValues.length;

        for ( let i = 0; i < n; i++ ) {

            const x = xValues[i];
            const y = yValues[i];

            sx += x;
            sxx += x * x;
            sxxx += x * x * x;
            sxxxx += x * x * x * x;

            sy += y;
            sxy += x * y;
            sxxy += x * x * y;

        }

        const matrix = new Matrix(
            new Array( n, sx, sxx, sy),
            new Array( sx, sxx, sxxx, sxy),
            new Array( sxx, sxxx, sxxxx, sxxy)
        );

        const sleSolverResult = SLESolver.solve(
            matrix
        );

        const a = sleSolverResult.c;
        const b = sleSolverResult.b;
        const c = sleSolverResult.a;

        if ( ! this.areRatesValid(a, b, c) ) {
            throw new Error('Can\'t perform calculations. Division by zero.');
        }

        return {
            a,
            b,
            ext: c
        };

    }
}