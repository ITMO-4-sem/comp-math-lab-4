import { Function } from '@ts/сalculations/functions/Function';
import { FunctionName } from '@ts/сalculations/functions/FunctionName';


export class QuadraticFunction extends Function {

    public readonly c: number;

    constructor(a: number, b: number, c: number) {
        super( a, b );
        this.c = c;
    }


    public calc(x: number): number {
        return this.a * x * x + this.b * x + this.c;
    }

    getLatexRepresentation(rounding?: number): string {
        let a = this.a.toString();
        let b = this.b.toString();
        let c = this.c.toString();
        if ( rounding ) {
            a = this.a.toFixed(rounding);
            b = this.b.toFixed(rounding);
            c = this.c.toFixed(rounding);
        }
        return `${a}*x^2 + ${b}*x + ${c}`;
    }


    getName(): FunctionName {
        return FunctionName.QUADRATIC_FUNCTION;
    }

}