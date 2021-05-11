import { Function } from '@ts/сalculations/functions/Function';


export class QuadraticFunction extends Function {

    public readonly c: number;

    constructor(a: number, b: number, c: number) {
        super( a, b );
        this.c = c;
    }


    public calc(x: number): number {
        return this.a * x * x + this.b * x + this.c;
    }

}