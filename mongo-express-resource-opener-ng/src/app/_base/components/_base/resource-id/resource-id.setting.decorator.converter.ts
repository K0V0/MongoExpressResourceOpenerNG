import { SettingDecoratorConverterBase } from "src/app/_base/decorators/setting/setting.decorator.converter";

export  class ResourceIdSettingDecoratorConverter
        extends SettingDecoratorConverterBase<string, string>
{
    protected mapForNgModel(content: string): string {
        return content;
    }

    // resourceId can only be set through click on ObjectId on Mongo Expresss web GUI
    // by any user action (input to field/paste from clipboard) it need to be deleted otherwise 
    // on future open of popup will be there and this is unwanted
    protected mapForStore(content: string): string {
       return "";
    }
}