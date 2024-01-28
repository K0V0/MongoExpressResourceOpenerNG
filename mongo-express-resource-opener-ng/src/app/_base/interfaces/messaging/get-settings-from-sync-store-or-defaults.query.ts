import {GetSettingsQuery} from "./base/get-settings.query";

export class GetSettingsFromSyncStoreOrDefaultsQuery extends GetSettingsQuery {
  getMessageId(): number {
    return 61;
  }

}
