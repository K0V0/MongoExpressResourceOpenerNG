export class CrateUtil {

    public static getCrate<TYP>(value : TYP) : Crate<TYP> {
        return new Crate<TYP>(value);
    } 

}

export class Crate<TYP> {
    public value : TYP;

    constructor(value : TYP) {
        this.value = value;
    }
}