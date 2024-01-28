import {GetSettingsQuery} from "./base/get-settings.query";

export class GetSettingsFromLocalStoreOrDefaultsQuery extends GetSettingsQuery {
  getMessageId(): number {
    return 71;
  }

}
