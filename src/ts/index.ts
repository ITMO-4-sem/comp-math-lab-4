import '@scss/index.scss'; // is necessary for connecting styles to index.html


import { Table } from '@ts/сalculations/Table';

import { Core } from '@ts/сalculations/Core';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import Desmos from 'desmos';
import { FileInput } from '@/components/FileInput/FileInput';


const elDesmos: HTMLDivElement = document.querySelector('.desmos') as HTMLDivElement;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const desmos = Desmos.GraphingCalculator(elDesmos);

console.log('desmos = ', desmos);



const elSubmitButton: HTMLButtonElement = document.querySelector('.button-submit') as HTMLButtonElement;
const elTextArea: HTMLTextAreaElement = document.querySelector('.textarea') as HTMLTextAreaElement;

// @ts-ignore
window.textArea = elTextArea;
const elGeneralResult = document.querySelector('.general-result') as HTMLPreElement;
const elBestFunction = document.querySelector('.best-function') as HTMLPreElement;

const elNotification = document.querySelector('.notification') as HTMLDivElement;
const elNotificationContent = document.querySelector('.notification__content') as HTMLParagraphElement;

const fileInput = new FileInput();

fileInput.onFileChosen( {
    onChosen(file: File) {
        readFile(file);
    }
});


let table: Table = new Table(
    new Array<number>(1.1, 2.3, 3.7, 4.5, 5.4, 6.8, 7.5 ),
    new Array<number>(2.73, 5.12, 7.74, 8.91, 10.59, 12.75, 13.43 )
);


elSubmitButton.addEventListener('click', () => {
    console.log('YES');

    hideNotification();

    try {
        table = prepareInput(elTextArea.value);
        calculate(table);
    } catch (e) {
        temporaryShowNotification(e);
    }
});
// const inputsSequence: InputsSequence = new InputsSequence({
//     inputsSequenceContainerSelector: 'inputs-sequence-container-x'
// });








function readFile(file: File): void {
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
        elTextArea.value = fileReader.result as string;
    };
    fileReader.onerror = () => {
        console.error('Не могу прочитать файл');
    };

}

function prepareInput(input: string): Table {
    const tmp: Array<string> = input.trim().split('\n');
    if ( tmp.length != 2) {
        throw new Error('Входные данные должны состоять из 2 строк');
    }

    const tmpX = tmp[0].trim().split(' ');
    const tmpY = tmp[1].trim().split( ' ');

    console.log('tmpX = ', tmpX);
    console.log('tmpY = ', tmpY);

    if ( tmpX.length != tmpY.length) {
        throw new Error('Количество иксов должно быть равно количеству игреков');
    }

    const xValues: Array<number> = new Array<number>();
    const yValues: Array<number> = new Array<number>();

    for ( const x of tmpX) {
        if ( ! isNumeric(x)) {
            throw new Error('Неправильный x: ' + x);
        }
        xValues.push(parseFloat(x));
    }

    for ( const y of tmpY ) {
        if ( ! isNumeric(y)) {
            throw new Error('Неправильный y: ' + y);
        }
        yValues.push(parseFloat(y));
    }

    return new Table(xValues, yValues);

}


function isNumeric(str: string | number): boolean {
    if (typeof str != "string") return false; // we only process strings!
    return !isNaN(Number( str )) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)); // ...and ensure strings of whitespace fail
}

function temporaryShowNotification(text: string, timeLimit?: number) {
    const timeLim = timeLimit ? timeLimit : 6000;

    showNotification(text);

    setTimeout( () => {
        hideNotification();
    }, timeLim);
}


function showNotification(text: string): void {
    elNotificationContent.innerText = text;
    elNotification.classList.remove('notification--hidden');
}


function hideNotification(): void {
    elNotification.classList.add('notification--hidden');
    // elNotificationContent.innerText = '';
}



function calculate(table: Table) {
    const core = new Core();

    const result = core.calculate(table);

    desmos.setBlank();
    desmos.setExpression({ id: 'dots', latex: convertTableToPointsList(table), color: 'red' });

    for ( const functionResult of result ) {
        desmos.setExpression( {
            id: functionResult.funcName,
            latex: functionResult.func.getLatexRepresentation( 3 )
        } );
    }


    result.sort( (a, b) => {
       return (
           a.standardDeviation - b.standardDeviation
       );
    });


    elBestFunction.textContent = prepareForPre(result[0]);
    elGeneralResult.textContent = prepareForPre(result);


    console.log('[0]',result[0]);

}



function prepareForPre(obj: any): string {
    return JSON.stringify(obj, undefined, 2);
}









function convertTableToPointsList(table: Table): string {

    let points: string = '';

    const xValues = table.getXValues();
    const yValues = table.getYValues();

    for ( let i = 0; i < table.size(); i++) {
        points += `(${xValues[i]}, ${yValues[i]}),`;
    }

    return points.slice(0, -1);
}










// const chartCTX = (document.querySelector('.chart-container__chart') as HTMLCanvasElement ).getContext('2d');
// let chart: any;
//
// let datasets: Array<any>;
// let labels: Array<number>;
//
//
// const start = table.getXValues()[0] - 2;
// const end = table.getXValues()[table.size() - 1] - 2;
//
// // eslint-disable-next-line prefer-const
// labels = new Array<number>();
// // labels = table.getXValues();
// for ( let i = start; i < end; i+= 0.1 ) {
//     labels.push(i);
// }
// console.warn('labels = ', labels);
//
// datasets = new Array<any>(
//   createDataset(prepareFunctionYValues(result.exponentialFunction.func, labels)),
//   // createDataset(prepareFunctionYValues(result.linearFunction.func, labels)),
//   // createDataset(result.logarithmicFunction.yValues),
//   // createDataset(result.powerFunction.yValues),
//   // createDataset(result.quadraticFunction.yValues),
// );
//
// // labels = table.getYValues();
//






//
// const options = {
//     series: [
//         {
//             name: 'Points',
//             type: 'scatter',
//
//             //2.14, 2.15, 3.61, 4.93, 2.4, 2.7, 4.2, 5.4, 6.1, 8.3
//             data: getScatterData(table.getXValues(), table.getYValues())
//             // [{
//             //         x: 1,
//             //         y: 2.14
//             //     }, {
//             //         x: 1.2,
//             //         y: 2.19
//             //     }, {
//             //         x: 1.8,
//             //         y: 2.43
//             //     }, {
//             //         x: 2.3,
//             //         y: 3.8
//             //     }, {
//             //         x: 2.6,
//             //         y: 4.14
//             //     }, {
//             //         x: 2.9,
//             //         y: 5.4
//             //     }, {
//             //         x: 3.2,
//             //         y: 5.8
//             //     }, {
//             //         x: 3.8,
//             //         y: 6.04
//             //     }, {
//             //         x: 4.55,
//             //         y: 6.77
//             //     }, {
//             //         x: 4.9,
//             //         y: 8.1
//             //     }, {
//             //         x: 5.1,
//             //         y: 9.4
//             //     }, {
//             //         x: 7.1,
//             //         y: 7.14
//             //     },{
//             //         x: 9.18,
//             //         y: 8.4
//             //     }
//             // ]
//         },
//         {
//         name: 'Line',
//         type: 'line',
//         data:  getScatterData(labels, prepareFunctionYValues(result.exponentialFunction.func, labels))// [{
//         //     x: 1,
//         //     y: 2
//         // }, {
//         //     x: 2,
//         //     y: 3
//         // }, {
//         //     x: 3,
//         //     y: 4
//         // }, {
//         //     x: 4,
//         //     y: 5
//         // }, {
//         //     x: 5,
//         //     y: 6
//         // }, {
//         //     x: 6,
//         //     y: 7
//         // }, {
//         //     x: 7,
//         //     y: 8
//         // }, {
//         //     x: 8,
//         //     y: 9
//         // }, {
//         //     x: 9,
//         //     y: 10
//         // }, {
//         //     x: 10,
//         //     y: 11
//         // }
//         //
//         // ]
//     }],
//     chart: {
//         height: 350,
//         type: 'line',
//     },
//     fill: {
//         type:'solid',
//     },
//     markers: {
//         size: 0
//     },
//     tooltip: {
//         shared: false,
//         intersect: true,
//     },
//     legend: {
//         show: true
//     },
//     xaxis: {
//         type: 'numeric',
//         min: 0,
//         max: 12,
//         tickAmount: 12
//     }
// };
// const chartMe = new ApexCharts(document.querySelector('#chart'), options);
//
// chartMe.render();
//
//
//
//
// function getScatterData(xValues: Array<number>, yValues: Array<number>): Array<{x: number, y: number}> {
//     const data = new Array();
//
//     for ( let i = 0; i < xValues.length; i ++ ) {
//         data.push({
//             x: xValues[i],
//             y: yValues[i]
//         });
//     }
//
//     console.log('Scattered data: ', data);
//
//     return data;
// }
//


// console.log('datasets = ', datasets);
// console.log('labels = ', labels);
//
// drawChart(labels, datasets, chartCTX);
//
//
//
// function prepareFunctionYValues(func: Function, xValues: Array<number>): Array<number> {
//
//     console.log('f = ', func);
//     console.log('xValues = ', xValues);
//
//     const yValues = new Array<number>();
//
//     for ( let i = 0; i < xValues.length; i ++ ) {
//         yValues.push( parseFloat(func.calc(xValues[i]).toFixed(2)));
//     }
//
//     console.log('yValuesExtended = ', yValues);
//
//     return yValues;
//
// }
//
// function createDataset(data: Array<any>) {
//     return {
//       type: 'line',
//       data: data,
//       tension: 0.5,
//       borderWidth: 3,
//     };
// }
//
// function drawChart(labels: Array<any>, datasets: Array<number>, ctx:  CanvasRenderingContext2D | null) {
//
//     if ( ctx === null) {
//         throw new Error('CTX is null');
//     }
//
//     if ( chart !== undefined ) {
//         chart.destroy();
//     }
//
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     // @ts-ignore
//     chart = new Chart( ctx, {
//         type: 'line',
//         data: {
//             labels: labels,
//             datasets: datasets,
//         },
//         options: {
//             // tooltips: {
//             //     callbacks: {
//             //         label: function(tooltipItem: any, data: any) {
//             //             let dataset = data.datasets[tooltipItem.datasetIndex];
//             //             let index = tooltipItem.index;
//             //             return dataset.labels[index] + ': ' + dataset.data[index];
//             //         }
//             //     }
//             // },
//             responsive: true,
//             maintainAspectRatio: false,
//             scales: {
//                 x: {
//                     offset: true,
//                     title: {
//                         display: true,
//                         text: 'x',
//                         color: COLOR_OLIVE_YELLOW,
//                     },
//                     // ticks: {
//                     //     // maxTicksLimit: 2,
//                     //     // autoSkip: true,
//                     //     callback: function(val: any, index: any): any {
//                     //         // Hide the label of every 2nd dataset
//                     //         console.log('val = ', val);
//                     //         console.log('index = ', index);
//                     //         // @ts-ignore
//                     //         console.log('getLabelForValue = ', this.getLabelForValue( val ));
//                     //         // @ts-ignore
//                     //         return index % 2 === 0 ? this.getLabelForValue( val ) : '';
//                     //     }
//                     // }
//                     //     // callback: function(val, index) {
//                     //     //     // Hide the label of every 2nd dataset
//                     //     //     return index % 2 === 0 ? this.getLabelForValue(val) : '';
//                     //     // },
//                     //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//                     //     //@ts-ignore
//                     //     // callback: function(value, index, values) {
//                     //     //     return index;
//                     //     // }
//                     // }
//                 },
//                 y: {
//                     // display: true,
//                     title: {
//                         display: true,
//                         text: 'n',
//                         color: COLOR_OLIVE_YELLOW,
//                     }
//                 }
//                 // offset: true
//             },
//             plugins: {
//                 title: {
//                     display: true,
//                     text: 'Полигон частот',
//                 }
//             }
//         }
//     } );
// }
//

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


// console.log(SLESolver.solve(matrix));

