///<reference types="chrome"/>

export interface QueryService {

    open : (key : string) => Promise<boolean>;
}