import { Function } from '@ts/сalculations/functions/Function';
import { FunctionName } from '@ts/сalculations/functions/FunctionName';


export class ExponentialFunction extends Function {

    public calc(x: number): number {
        return Math.exp(this.a + this.b * x);
    }


    getLatexRepresentation(rounding?: number): string {
        let a = this.a.toString();
        let b = this.b.toString();
        if ( rounding ) {
            a = this.a.toFixed(rounding);
            b = this.b.toFixed(rounding);
        }
        return `e^{${a} + ${b} * x}`;
    }


    getName(): FunctionName {
        return FunctionName.EXPONENTIAL_FUNCTION;
    }
}