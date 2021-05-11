import { Table } from '@ts/сalculations/Table';
import { ApproximationResult } from '@ts/сalculations/approximation/approximationresult/ApproximationResult';
import { Approximation } from '@ts/сalculations/approximation/Approximation';


export class PowerApproximation extends Approximation {

    public approximate(table: Table): ApproximationResult {

        let sLnXLnY: number = 0;
        let sLnX: number = 0;
        let sLnY: number = 0;
        let sLnXLnX: number = 0;

        const xValues = table.getXValues();
        const yValues = table.getYValues();

        const n = xValues.length;

        for ( let i = 0; i < n; i++ ) {
            const x = xValues[i];
            const y = yValues[i];

            if ( x <= 0 || y <= 0) { // because of ln
                continue;
            }

            sLnXLnY += Math.log(x) * Math.log(y);
            sLnX += Math.log(x);
            sLnY += Math.log(y);
            sLnXLnX += Math.log(x) * Math.log(x);
        }

        const b = ( n * sLnXLnY - sLnX * sLnY ) / ( n * sLnXLnX - sLnX * sLnX );

        const a = Math.exp( 1/n * sLnY - b / n * sLnX );

        if ( ! this.areRatesValid(a, b) ) {
            throw new Error('Can\'t perform calculations. Division by zero.');
        }

        return { a, b };
    }
}

