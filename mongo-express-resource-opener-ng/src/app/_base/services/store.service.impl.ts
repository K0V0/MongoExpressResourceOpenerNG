import {StoreService} from "./store.service";
import {StoreLocalService} from "./store-local.service";
import {StoreSyncService} from "./store-sync.service";

export class StoreServiceImpl implements StoreService {

  private localStoreService : StoreService;
  private syncStoreService : StoreService;

  constructor(localStoreService: StoreLocalService, syncStoreService : StoreSyncService) {
    this.localStoreService = localStoreService;
    this.syncStoreService = syncStoreService;
  }

  load(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.syncStoreService.load(key)
        .then((result : any) => { resolve(result); })
        .catch(() => {
          this.localStoreService.load(key)
            .then((result : any) => resolve(result))
            .catch(() => reject("Result not found neither in synced neither in local storage"))
        })
    });
  }

  loadWithKey(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.syncStoreService.loadWithKey(key)
        .then((result : any) => { resolve(result); })
        .catch(() => {
          this.localStoreService.loadWithKey(key)
            .then((result : any) => resolve(result))
            .catch(() => reject("Result not found neither in synced neither in local storage"))
        })
    });
  }

  save(key: string, content: any): Promise<any> {
    return new Promise((resolve, reject) => {
      reject("Saving is not permitted using this service, key: " + key + ", content: " + content);
    });
  }

}
