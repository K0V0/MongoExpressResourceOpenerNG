import {ResourceService} from "./resource.service";
import {FindDocumentMessage} from "../interfaces/messaging.interface";
import {BaseUtil} from "../utils/base.util";
import {FindDocumentQuery} from "../interfaces/messaging/find-document.query";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root', // or specify a module where it's provided
})
export class ResourceServiceImpl implements ResourceService {
  openInNewTab(resourceId: string): Promise<any> {

    const message : FindDocumentMessage = new class implements FindDocumentMessage {
      resourceId = resourceId as string;
    }

    return BaseUtil.sendMessage(new FindDocumentQuery(message))
  }

}
