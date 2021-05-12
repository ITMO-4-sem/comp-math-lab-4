import { Function } from '@ts/сalculations/functions/Function';
import { FunctionName } from '@ts/сalculations/functions/FunctionName';


export class LinearFunction extends Function {
    public calc(x: number): number {
        return this.a * x + this.b;
    }
    getLatexRepresentation(rounding?: number): string {
        let a = this.a.toString();
        let b = this.b.toString();
        if ( rounding ) {
            a = this.a.toFixed(rounding);
            b = this.b.toFixed(rounding);
        }
        return `${a} * x + ${b}`;
    }


    getName(): FunctionName {
        return FunctionName.LINEAR_FUNCTION;
    }
}