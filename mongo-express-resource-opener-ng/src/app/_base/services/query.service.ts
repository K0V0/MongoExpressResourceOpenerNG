import { Setting } from 'src/app/_base/decorators/setting/setting.decorator';
///<reference types="chrome"/>

export interface QueryService {

    open : (key : string) => Promise<boolean>;
}

export interface KeyValuePair {
    [key: string]: any;
}

export type Settings = KeyValuePair[];