///<reference types="chrome"/>

export interface StoreService {

    load : (key : string) => Promise<any>;
    loadWithKey : (key : string) => Promise<any>;
    save : (key : string, content : any) => Promise<any>;
}
