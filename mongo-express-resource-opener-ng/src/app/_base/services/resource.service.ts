///<reference types="chrome"/>

export interface ResourceService {

  openInNewTab : (resourceId : string) => Promise<any>;
}
