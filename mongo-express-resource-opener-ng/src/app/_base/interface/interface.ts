export interface Message {
    id : number;
    data : string;
}

export enum MessageIds {
    UNKNOWN, 
    HTTP_REQUEST
}