import { Function } from '@ts/сalculations/functions/Function';


export class LinearFunction extends Function {
    public calc(x: number): number {
        return this.a * x + this.b;
    }

}