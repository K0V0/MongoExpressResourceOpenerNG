import {SettingDecoratorConverterBase} from "../../../_base/decorators/setting/setting.decorator.converter";
import {
  DocumentIdSetupNgModelType,
  DocumentIdSetupStoreType
} from "../../../_base/components/_base/document-id-setup/document-id-setup.interfaces";

export  class DocumentIdSetupSettingDecoratorConverter
  extends SettingDecoratorConverterBase<DocumentIdSetupNgModelType, DocumentIdSetupStoreType>
{
  private static readonly SEPARATOR : string = ",";

  protected mapForNgModel(content: DocumentIdSetupStoreType) : DocumentIdSetupNgModelType {
    return content
      ?.map((val : string) => val.trim())
      .join(DocumentIdSetupSettingDecoratorConverter.SEPARATOR + " ");
  }

  protected mapForStore(content: DocumentIdSetupNgModelType) : DocumentIdSetupStoreType {
    return content
      ?.replace(/\s/g, '')
      .trim()
      .split(DocumentIdSetupSettingDecoratorConverter.SEPARATOR);
  }
}
