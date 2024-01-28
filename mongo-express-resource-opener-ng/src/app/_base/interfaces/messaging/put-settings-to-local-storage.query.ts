import {PutSettingsQuery} from "./base/put-settings.query";

export class PutSettingsToLocalStorageQuery extends PutSettingsQuery {
  getMessageId(): number {
    return 8;
  }

  withKey(key: string) : this {
    return this.w('key', key);
  }

  withValue(value: any) : this {
    return this.w('value', value);
  }

}
