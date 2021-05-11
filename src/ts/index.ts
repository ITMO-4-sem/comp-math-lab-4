// import '@scss/index.scss'; // is necessary for connecting styles to index.html

import { Table } from '@ts/сalculations/Table';
import { LinearApproximation } from '@ts/сalculations/approximation/LinearApproximation';
import { Matrix } from '@ts/сalculations/util/Matrix';
import { SLESolver } from '@ts/сalculations/util/SLESolver';
import { QuadraticApproximation } from '@ts/сalculations/approximation/QuadraticApproximation';
import { PowerApproximation } from '@ts/сalculations/approximation/PowerApproximation';
import { LogarithmicApproximation } from '@ts/сalculations/approximation/LogarithmicApproximation';
import { ExponentialApproximation } from '@ts/сalculations/approximation/ExponentialApproximation';
import { ApproximationResultExtended } from '@ts/сalculations/approximation/approximationresult/ApproximationResultExtended';
import { Core } from '@ts/сalculations/Core';

const linearApproximation = new LinearApproximation();

// const table: Table = new Table(
//     new Array<number>(1.2, 2.9, 4.1, 5.5, 6.7, 7.8, 9.2, 10.3 ),
//     new Array<number>(7.4, 9.5, 11.1, 12.9, 14.6, 17.3, 18.2, 20.7 )
// );

// const table: Table = new Table(
//     new Array<number>(1.1, 2.3, 3.7, 4.5, 5.4, 6.8, 7.5 ),
//     new Array<number>(3.5, 4.1, 5.2, 6.9, 8.3, 14.8, 21.2 )
// );

const table: Table = new Table(
    new Array<number>(1.1, 2.3, 3.7, 4.5, 5.4, 6.8, 7.5 ),
    new Array<number>(2.73, 5.12, 7.74, 8.91, 10.59, 12.75, 13.43 )
);

const linearApproxResult = linearApproximation.approximate(table);


// const matrix = new Matrix(
//     new Array(2, 3, 1, 1),
//     new Array(3, -1, 2, 1),
//     new Array(1, 4, -1, 2)
// );
//
// const clonedMatrix: Matrix = matrix.clone();

// clonedMatrix.setColumn(new Array(8,8), 1)

// clonedMatrix.setColumn(new Array<number>(8, 8),2);

// new QuadraticApproximation().approximate(table);

// console.log(new ExponentialApproximation().approximate(table));

const core = new Core();

const result = core.do(table);
console.log('------ result ------');
console.log(result);
// console.log(SLESolver.solve(matrix));

