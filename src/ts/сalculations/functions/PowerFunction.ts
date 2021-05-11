import { Function } from '@ts/сalculations/functions/Function';


export class PowerFunction extends Function {

    public calc(x: number): number {
        return this.a * Math.pow(x, this.b);
    }

}