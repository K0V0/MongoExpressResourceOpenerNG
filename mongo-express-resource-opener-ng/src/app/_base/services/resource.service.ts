///<reference types="chrome"/>

import {MessageResponse} from "../interfaces/messaging.interface";

export interface ResourceService {

  openInNewTab : (resourceId : string) => Promise<MessageResponse>;
}
