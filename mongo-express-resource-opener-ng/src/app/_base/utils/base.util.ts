
export class BaseUtil {

    public static deepClone<TYP>(originalObject : TYP) : TYP {
        return JSON.parse(JSON.stringify(originalObject));
    }

}