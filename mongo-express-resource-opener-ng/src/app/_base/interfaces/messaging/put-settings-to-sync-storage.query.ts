import {PutSettingsQuery} from "./base/put-settings.query";

export class PutSettingsToSyncStorageQuery extends PutSettingsQuery {
  getMessageId(): number {
    return 9;
  }

}
