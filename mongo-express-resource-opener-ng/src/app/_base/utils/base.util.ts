
export class BaseUtil {

    public static deepClone<TYP>(originalObject : TYP) : TYP {
        return JSON.parse(JSON.stringify(originalObject));
    }

    public static flattenArray(arr : any[]) : any[] {
        let result : any[] = [];
        arr.forEach(item => {
            if (Array.isArray(item)) {
            result = result.concat(BaseUtil.flattenArray(item));
            } else {
            result.push(item);
            }
        });
        return result;
    }

}