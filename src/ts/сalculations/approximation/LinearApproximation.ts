import { Table } from '@ts/сalculations/Table';
import { ApproximationResultExtended } from '@ts/сalculations/approximation/approximationresult/ApproximationResultExtended';
import { Approximation } from '@ts/сalculations/approximation/Approximation';


export class LinearApproximation extends Approximation {

    public approximate( table: Table ): ApproximationResultExtended {

        let sx: number = 0;
        let sxx: number = 0;
        let sy: number = 0;
        let syy: number = 0;
        let sxy: number = 0;

        const xValues = table.getXValues();
        const yValues = table.getYValues();

        const n = xValues.length;

        for ( let i = 0; i < n; i++ ) {
            const x = xValues[i];
            const y = yValues[i];

            sx += x;
            sxx += x * x;

            sy += y;
            syy += y * y;

            sxy += x * y;
        }

        const d = sxx * n - sx * sx;
        const d1 = sxy * n - sx * sy;
        const d2 = sxx * sy - sx * sxy;

        const a: number = d1 / d;
        const b: number = d2 / d;

        // Коэффициент корреляции Пирсона
        const r = ( n * sxy - sx * sy ) / Math.sqrt( (n * sxx - sx * sx) * (n * syy - sy * sy) );

        if ( ! this.areRatesValid(a, b, r) ) {
            throw new Error('Can\'t perform calculations. Division by zero.');
        }

        return { a, b, ext:r };

    }
}