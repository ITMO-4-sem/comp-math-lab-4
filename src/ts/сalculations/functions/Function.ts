
export abstract class Function {

    public readonly a: number;
    public readonly b: number;


    public constructor(a: number, b: number) {
        this.a = a;
        this.b = b;
    }

    public abstract calc(x: number): number;

}