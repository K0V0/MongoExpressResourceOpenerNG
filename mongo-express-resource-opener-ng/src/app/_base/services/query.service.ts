import { Setting } from 'src/app/_base/decorators/setting/setting.decorator';
///<reference types="chrome"/>

export interface QueryService {

    open : (key : string) => Promise<void>;
}

export interface KeyValuePair {
    [key: string]: any;
}

export type Settings = KeyValuePair[];

export interface QueryMessage {
  url : string;
  authHeader : string | null;
}
