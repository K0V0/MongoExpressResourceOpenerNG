
//TODO unite somehow with angular and JS part of app

export interface Message {
    id : number;
    data : any;
}


export interface HttpRequestMessage extends Message {
    data : HttpRequestQuery;
}

export interface HttpRequestQuery {
    url : string;
    authHeader : string | null;
}


export interface StoreRequestMessage extends Message {
    data : StoreRequestQuery;
}

export interface StoreRequestQuery {
    key : string;
    value : any;
}


export enum MessageIds {
    UNKNOWN,
    HTTP_REQUEST,
    OPEN_DOCUMENT_IN_NEW_TAB,
    GET_DATA_FROM_STORES,
    GET_DATA_FROM_LOCAL_STORE,
    GET_DATA_FROM_SYNC_STORE,
    PUT_DATA_TO_LOCAL_STORE,
    PUT_DATA_TO_SYNC_STORE,
    GET_DATA_FROM_STORES_WRAPPED,
    GET_DATA_FROM_LOCAL_STORE_WRAPPED,
    GET_DATA_FROM_SYNC_STORE_WRAPPED
}
