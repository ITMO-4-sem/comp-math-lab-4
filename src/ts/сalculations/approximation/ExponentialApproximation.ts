import { Table } from '@ts/сalculations/Table';
import { ApproximationResult } from '@ts/сalculations/approximation/approximationresult/ApproximationResult';
import { Approximation } from '@ts/сalculations/approximation/Approximation';


export class ExponentialApproximation extends Approximation {

    public approximate(table: Table): ApproximationResult {

        let sXLnY: number = 0;
        let sLnY: number = 0;//
        let sX: number = 0;
        let sXX: number = 0;

        const xValues = table.getXValues();
        const yValues = table.getYValues();

        const n = xValues.length;

        for ( let i = 0; i < n; i++ ) {
            const x = xValues[i];
            const y = yValues[i];

            if ( y <= 0) { // because of ln
                continue;

            }

            sXLnY += x * Math.log( y );
            sX += x;
            sLnY += Math.log( y );
            sXX += x * x;
        }

        const b = (n * sXLnY - sX * sLnY) / (n * sXX - sX * sX);

        const a = 1 / n * sLnY - b / n * sX;

        if ( ! this.areRatesValid(a, b) ) {
            throw new Error('Can\'t perform calculations. Division by zero or other' +
                ' calculation error. Please, enter different data.');
        }

        return { a, b };
    }
}

