import { Function } from '@ts/сalculations/functions/Function';


export class LogarithmicFunction extends Function {

    public calc(x: number): number {
        return this.a + this.b * Math.log(x);
    }

}