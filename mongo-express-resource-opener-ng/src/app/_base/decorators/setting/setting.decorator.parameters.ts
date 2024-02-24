import {SettingDecoratorConverter} from "./setting.decorator.converter";

export interface SettingDecoratorParameters {
    // default value to use if no value in chrome store is found
    defaultValue ?: any;
    // if enabled, do not use chrome sync storage to store value, store value locally only
    localOnly ?: boolean;
    // allow passing "undefined" as default value (which is default value of unitialized property by default)
    allowUndefined ?: boolean;
    // define own key under which is value stored in google chrome storage
    // by default mechanism uses containing class and property name combination as key
    storeKey ?: string;
    // switch into uni-directional relationship with chrome store, value will be transfered from chrome store
    // and set to property, but no other way round. By default, binding is bi-directional
    onlyDownload ?: boolean;
    // provide converter fullfiling SettingDecoratorConverter interface specification if You need your data
    // have converted/modified when coming from/to chrome store
    converter ?: SettingDecoratorConverter<any, any>;
    // callback after geting settings from server and resolving all premises
    executeAfterDownload ?: Function;
    // this callbacks are executed each time whem value of variable is changed
    executeBeforeStoreBeforeConversion ?: Function;
    executeBeforeStoreAfterConversion ?: Function;
    executeOnGet ?: Function;
    // this callbacks executes once page (popup) is loaded
    executeAfterAll ?: Function;
    executeBeforeAll ?: Function;
}
