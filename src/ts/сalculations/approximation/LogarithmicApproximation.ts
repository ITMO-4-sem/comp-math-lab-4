import { Table } from '@ts/сalculations/Table';
import { ApproximationResult } from '@ts/сalculations/approximation/approximationresult/ApproximationResult';
import { Approximation } from '@ts/сalculations/approximation/Approximation';


export class LogarithmicApproximation extends Approximation {

    public approximate(table: Table): ApproximationResult {


        let sYLnX: number = 0;
        let sLnX: number = 0;//
        let sY: number = 0;
        let sLnXLnX: number = 0;//

        const xValues = table.getXValues();
        const yValues = table.getYValues();

        const n = xValues.length;

        for ( let i = 0; i < n; i++ ) {
            const x = xValues[i];
            const y = yValues[i];

            if ( x <= 0) { // because of ln
                continue;
            }

            sYLnX += y * Math.log(x);

            sLnX += Math.log(x);
            sY += y;
            sLnXLnX += Math.log(x) * Math.log(x);
        }

        const b = ( n * sYLnX - sLnX * sY ) / ( n * sLnXLnX - sLnX * sLnX );
        const a = 1/n * sY - b/n * sLnX;

        if ( ! this.areRatesValid(a, b) ) {
            throw new Error('Can\'t perform calculations. Division by zero.');
        }

        return { a, b };
    }

}

