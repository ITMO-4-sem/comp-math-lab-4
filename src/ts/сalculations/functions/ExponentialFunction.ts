import { Function } from '@ts/сalculations/functions/Function';


export class ExponentialFunction extends Function {

    public calc(x: number): number {
        return Math.exp(this.a + this.b * x);
    }
}