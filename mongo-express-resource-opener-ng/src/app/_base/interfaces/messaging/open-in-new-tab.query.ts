import {MessagingAbstract} from "../messaging.abstract";
import {OpenInNewTabMessage} from "../messaging.interface";

export class OpenInNewTabQuery extends MessagingAbstract<OpenInNewTabMessage> {

  getMessageId(): number {
    return 5;
  }

  addUrls(urls: string[]): this {
    if (!this.data.url) {
      this.data.url = [];
    }
    this.data.url.push(...urls);
    return this;
  }

  addUrl(url: string): this {
    if (!this.data.url) {
      this.data.url = [];
    }
    this.data.url.push(url);
    return this;
  }

  withUrls(urls: string[]): this {
    this.data.url = urls;
    return this;
  }

}
