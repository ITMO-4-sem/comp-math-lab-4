import { Table } from '@ts/сalculations/Table';
import { ApproximationResult } from '@ts/сalculations/approximation/approximationresult/ApproximationResult';
import { ExponentialApproximation } from '@ts/сalculations/approximation/ExponentialApproximation';
import { ApproximationResultExtended } from '@ts/сalculations/approximation/approximationresult/ApproximationResultExtended';
import { LinearApproximation } from '@ts/сalculations/approximation/LinearApproximation';
import { LogarithmicApproximation } from '@ts/сalculations/approximation/LogarithmicApproximation';
import { PowerApproximation } from '@ts/сalculations/approximation/PowerApproximation';
import { QuadraticApproximation } from '@ts/сalculations/approximation/QuadraticApproximation';
import { ExponentialFunction } from '@ts/сalculations/functions/ExponentialFunction';
import { LinearFunction } from '@ts/сalculations/functions/LinearFunction';
import { LogarithmicFunction } from '@ts/сalculations/functions/LogarithmicFunction';
import { PowerFunction } from '@ts/сalculations/functions/PowerFunction';
import { QuadraticFunction } from '@ts/сalculations/functions/QuadraticFunction';
import { Function } from '@ts/сalculations/functions/Function';
import { FunctionName } from '@ts/сalculations/functions/FunctionName';


export class Core {


    public calculate(table: Table): Array<FunctionResult> {

        const n = table.size();
        const tableYValues = table.getYValues();
        const tableXValues = table.getXValues();

        const exponentialApproxResult: ApproximationResult = new ExponentialApproximation().approximate(table);
        const linearApproxResult: ApproximationResultExtended = new LinearApproximation().approximate(table);
        const logarithmicApproxResult: ApproximationResult = new LogarithmicApproximation().approximate(table);
        const powerApproxResult: ApproximationResult = new PowerApproximation().approximate(table);
        const quadraticApproxResult: ApproximationResultExtended = new QuadraticApproximation().approximate(table);


        const approxResultsArray: Array<ApproximationResult> = new Array<ApproximationResult>();
        approxResultsArray.push( exponentialApproxResult );
        approxResultsArray.push( linearApproxResult );
        approxResultsArray.push( logarithmicApproxResult );
        approxResultsArray.push( powerApproxResult );
        approxResultsArray.push( quadraticApproxResult );


        const functionsArray: Array<Function> = new Array<Function>();

        functionsArray.push( new ExponentialFunction(
            exponentialApproxResult.a, exponentialApproxResult.b
        ) );
        functionsArray.push( new LinearFunction(
            linearApproxResult.a,
            linearApproxResult.b
        ) );
        functionsArray.push( new LogarithmicFunction(
            logarithmicApproxResult.a,
            logarithmicApproxResult.b
        ) );
        functionsArray.push( new PowerFunction(
            powerApproxResult.a,
            powerApproxResult.b
        ) );
        functionsArray.push( new QuadraticFunction(
            quadraticApproxResult.a,
            quadraticApproxResult.b,
            quadraticApproxResult.ext
        ) );

        const functionsResultsArray: Array<FunctionResult> = new Array<FunctionResult>();


        for ( let i = 0; i < 5; i++ ) {

            const func = functionsArray[i];
            const approxResult = approxResultsArray[i];

            // console.log('func = ', func);
            // console.log('approxResult = ', approxResult);

            const yValues = this.prepareApproxFuncYValues(tableXValues, func);
            console.log('yValues = ', yValues);
            const deviationMeasure = this.calcDeviationMeasure(tableYValues, yValues);
            const standardDeviation = this.calcStandardDeviation(deviationMeasure, n);
            const approximationReliability = this.calcApproximationFunctionReliability(deviationMeasure, yValues, n);

            functionsResultsArray.push(
                {
                    funcName: func.getName(),
                    func,
                    yValues,
                    approxResult,
                    approximationReliability,
                    deviationMeasure,
                    standardDeviation,
                }
            );
        }

        return functionsResultsArray;
        //
        // const exponentialApproxResult: ApproximationResult = new ExponentialApproximation().approximate(table);
        // const exponentialFunction: ExponentialFunction = new ExponentialFunction(
        //     exponentialApproxResult.a, exponentialApproxResult.b
        // );
        // const exponentialFunctionYValues = this.prepareApproxFuncYValues(xValues, exponentialFunction);
        // const exponentialFunctionDeviationMeasure = this.calcDeviationMeasure(yValues, exponentialFunctionYValues);
        // const exponentialFunctionStandardDeviation = this.calcStandardDeviation(exponentialFunctionDeviationMeasure, n);
        // const exponentialFunctionReliability = this.calcApproximationFunctionReliability(exponentialFunctionDeviationMeasure, exponentialFunctionYValues, n);
        //
        //
        // const linearApproxResult: ApproximationResultExtended = new LinearApproximation().approximate(table);
        // const linearFunction: LinearFunction = new LinearFunction(
        //     linearApproxResult.a,
        //     linearApproxResult.b
        // );
        // const linearFunctionYValues = this.prepareApproxFuncYValues(xValues, linearFunction);
        // const linearFunctionDeviationMeasure = this.calcDeviationMeasure(yValues, linearFunctionYValues);
        // const linearFunctionStandardDeviation = this.calcStandardDeviation(linearFunctionDeviationMeasure, n);
        // const linearFunctionReliability = this.calcApproximationFunctionReliability(linearFunctionDeviationMeasure, linearFunctionYValues, n);
        //
        //
        //
        // const logarithmicApproxResult: ApproximationResult = new LogarithmicApproximation().approximate(table);
        // const logarithmicFunction: LogarithmicFunction = new LogarithmicFunction(
        //     logarithmicApproxResult.a,
        //     logarithmicApproxResult.b
        // );
        // const logarithmicFunctionYValues = this.prepareApproxFuncYValues(xValues, logarithmicFunction);
        // const logarithmicFunctionDeviationMeasure = this.calcDeviationMeasure(yValues, logarithmicFunctionYValues);
        // const logarithmicFunctionStandardDeviation = this.calcStandardDeviation(logarithmicFunctionDeviationMeasure, n);
        // const logarithmicFunctionReliability = this.calcApproximationFunctionReliability(logarithmicFunctionDeviationMeasure, logarithmicFunctionYValues, n);
        //
        //
        // const powerApproxResult: ApproximationResult = new PowerApproximation().approximate(table);
        // const powerFunction: PowerFunction = new PowerFunction(
        //     powerApproxResult.a,
        //     powerApproxResult.b
        // );
        // const powerFunctionYValues = this.prepareApproxFuncYValues(xValues, powerFunction);
        // const powerFunctionDeviationMeasure = this.calcDeviationMeasure(yValues, powerFunctionYValues);
        // const powerFunctionStandardDeviation = this.calcStandardDeviation(powerFunctionDeviationMeasure, n);
        // const powerFunctionReliability = this.calcApproximationFunctionReliability(powerFunctionStandardDeviation, powerFunctionYValues, n);
        //
        //
        //
        // const quadraticApproxResult: ApproximationResultExtended = new QuadraticApproximation().approximate(table);
        // const quadraticFunction: QuadraticFunction = new QuadraticFunction(
        //     quadraticApproxResult.a,
        //     quadraticApproxResult.b,
        //     quadraticApproxResult.ext
        // );
        // const quadraticFunctionYValues = this.prepareApproxFuncYValues(xValues, quadraticFunction);
        // const quadraticFunctionDeviationMeasure = this.calcDeviationMeasure(yValues, quadraticFunctionYValues);
        // const quadraticFunctionStandardDeviation = this.calcStandardDeviation(quadraticFunctionDeviationMeasure, n);
        // const quadraticFunctionReliability = this.calcApproximationFunctionReliability(quadraticFunctionDeviationMeasure, quadraticFunctionYValues, n);
        //
        // return {
        //     linearFunction: {
        //         func: linearFunction,
        //         approxResult: linearApproxResult,
        //         yValues: linearFunctionYValues,
        //         deviationMeasure: logarithmicFunctionDeviationMeasure, // S
        //         standardDeviation: linearFunctionStandardDeviation, // СКО
        //         approximationReliability: linearFunctionReliability,
        //
        //     },
        //     logarithmicFunction: {
        //         func: logarithmicFunction,
        //         approxResult: logarithmicApproxResult,
        //         yValues: logarithmicFunctionYValues,
        //         deviationMeasure: logarithmicFunctionDeviationMeasure, // S
        //         standardDeviation: logarithmicFunctionStandardDeviation, // СКО
        //         approximationReliability: logarithmicFunctionReliability,
        //
        //     },
        //     powerFunction: {
        //         func: powerFunction,
        //         approxResult: powerApproxResult,
        //         yValues: powerFunctionYValues,
        //         deviationMeasure: powerFunctionDeviationMeasure, // S
        //         standardDeviation: powerFunctionStandardDeviation, // СКО
        //         approximationReliability: powerFunctionReliability,
        //     },
        //     quadraticFunction: {
        //         func: quadraticFunction,
        //         approxResult: quadraticApproxResult,
        //         yValues: quadraticFunctionYValues,
        //         deviationMeasure: quadraticFunctionDeviationMeasure, // S
        //         standardDeviation: quadraticFunctionStandardDeviation, // СКО
        //         approximationReliability: quadraticFunctionReliability,
        //     },
        //     exponentialFunction: {
        //         func: exponentialFunction,
        //         approxResult: exponentialApproxResult,
        //         yValues: exponentialFunctionYValues,
        //         deviationMeasure: exponentialFunctionDeviationMeasure, // S
        //         standardDeviation: exponentialFunctionStandardDeviation, // СКО
        //         approximationReliability: exponentialFunctionReliability,
        //     }
        // };
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    private prepareApproxFuncYValues(xValues: Array<number>, func: Function): Array<number> {
        const allegedYValues: Array<number> = new Array<number>(); // alleged -
        // предполагаемый
        // console.log('xVlues = ', xValues);

        for ( let i = 0; i < xValues.length; i++ ) {
            allegedYValues.push( func.calc(xValues[i]) );
        }

        // console.log('yValues = ', allegedYValues);

        return allegedYValues;
    }


    private calcDeviationMeasure(yValues: Array<number>, allegedYValues: Array<number>) { // Мера
        // отклонения

        let deviationMeasure = 0;

        for ( let i = 0; i < yValues.length; i++ ) {
            deviationMeasure += Math.pow( allegedYValues[i]  - yValues[i], 2);
        }

        return deviationMeasure;
    }

    private calcStandardDeviation(deviationMeasure: number, n: number) { // СКО
        return Math.sqrt( deviationMeasure / n);
    }

    private calcApproximationFunctionReliability(deviationMeasure: number, yValues: Array<number>, n: number): number { // достоверность
        // аппроксимации функции

        let sY = 0;
        let sYY = 0;

        for ( let i = 0; i < yValues.length; i++ ) {
            const y = yValues[i];
            sY += y;
            sYY += y * y;
        }

        return 1 - ( deviationMeasure / ( sYY - 1/n * sY * sY ));

    }
}

export interface FunctionResult {
    // eslint-disable-next-line @typescript-eslint/ban-types
    funcName: FunctionName,
    func: Function,
    approxResult: ApproximationResult,
    yValues: Array<number>,
    deviationMeasure: number, // S
    standardDeviation: number, // СКО
    approximationReliability: number
}

// export interface CoreResult {
//     exponentialFunction: FunctionResult;
//     linearFunction: FunctionResult,
//     logarithmicFunction: FunctionResult,
//     powerFunction: FunctionResult,
//     quadraticFunction: FunctionResult
// }