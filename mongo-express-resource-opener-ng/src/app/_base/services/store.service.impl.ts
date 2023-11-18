import {StoreService} from "./store.service";
import {StoreRequestMessage, StoreRequestQuery} from "../interfaces/messaging.interface";

export abstract class StoreServiceImpl implements StoreService {
    load(key: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    loadWithKey(key: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    save(key: string, content: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    protected createGetRequest(operationType : number, key : string) : StoreRequestMessage {
        let query : StoreRequestQuery = new class implements StoreRequestQuery {
            key : string = key;
            value : any = null;
        }
        return new class implements StoreRequestMessage {
            data : StoreRequestQuery = query;
            id: number = operationType;
        }
    }

}
