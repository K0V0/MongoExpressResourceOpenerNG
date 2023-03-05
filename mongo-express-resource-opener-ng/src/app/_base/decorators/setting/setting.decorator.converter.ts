export interface SettingDecoratorConverter<TYPE_IN_NG, TYPE_IN_STORE> {
    // in implementing class, return null if You do not want conversion in some direction
    // model -> settings store
    modelConversion : (content : TYPE_IN_NG) => TYPE_IN_STORE | undefined; 
    // settings store -> model
    storeConversion : (content : TYPE_IN_STORE) => TYPE_IN_NG | undefined;
}

export  abstract class SettingDecoratorConverterBase<TYPE_IN_NG, TYPE_IN_STORE> 
        implements SettingDecoratorConverter<TYPE_IN_NG, TYPE_IN_STORE> 
{
    protected abstract mapForNgModel(content : TYPE_IN_STORE) : TYPE_IN_NG;
    protected abstract mapForStore(content : TYPE_IN_NG) : TYPE_IN_STORE;

    public storeConversion(content : TYPE_IN_STORE) : TYPE_IN_NG | undefined {
        if (content === undefined || content === null) {
            return undefined;
        }
        return this.mapForNgModel(content);
    }

    public modelConversion(content: TYPE_IN_NG) : TYPE_IN_STORE | undefined {
        if (content === undefined) {
            return undefined;
        }
        return this.mapForStore(content);
    }
}