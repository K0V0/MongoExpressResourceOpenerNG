import {GetSettingsQuery} from "./base/get-settings.query";

export class GetSettingsFromAllStoresOrDefaultsQuery extends GetSettingsQuery {
  getMessageId(): number {
    return 31;
  }

}
