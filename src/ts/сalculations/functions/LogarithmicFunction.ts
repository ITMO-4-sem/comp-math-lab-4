import { Function } from '@ts/сalculations/functions/Function';
import { FunctionName } from '@ts/сalculations/functions/FunctionName';


export class LogarithmicFunction extends Function {

    public calc(x: number): number {
        return this.a + this.b * Math.log(x);
    }

    getLatexRepresentation(rounding?: number): string {
        let a = this.a.toString();
        let b = this.b.toString();
        if ( rounding ) {
            a = this.a.toFixed(rounding);
            b = this.b.toFixed(rounding);
        }
        return `${a} + ${b} * \\ln(x)`;
    }


    getName(): FunctionName {
        return FunctionName.LOGARITHMIC_FUNCTION;
    }

}