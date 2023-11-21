///<reference types="chrome"/>

export interface QueryService {
    open : (key : string) => Promise<void>;
}

export interface KeyValuePair {
    [key: string]: any;
}

export type Settings = KeyValuePair[];
