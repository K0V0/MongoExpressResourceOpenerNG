import {ResourceService} from "./resource.service";
import {MessageResponse} from "../interfaces/messaging.interface";
import {BaseUtil} from "../utils/base.util";
import {FindDocumentQuery} from "../interfaces/messaging/find-document.query";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ResourceServiceImpl implements ResourceService {
  openInNewTab(resourceId: string): Promise<MessageResponse> {
    return BaseUtil.sendMessage(new FindDocumentQuery().withResourceId(resourceId));
  }

}
