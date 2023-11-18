import {QueryMessage} from "../services/query.service";

export interface Message {
    id : number;
    data : QueryMessage;
}

export enum MessageIds {
    UNKNOWN,
    HTTP_REQUEST
}
