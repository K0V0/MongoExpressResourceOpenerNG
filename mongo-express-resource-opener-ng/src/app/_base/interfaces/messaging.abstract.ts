import {MessageBase} from "./messaging.interface";

export abstract class MessagingAbstract<DATA_TYPE extends MessageBase> {

  protected data : DATA_TYPE;

  public abstract getMessageId() : number;

  constructor() {
    this.data = {} as DATA_TYPE
  }

  w<KEY_TYPE extends keyof DATA_TYPE>(key: KEY_TYPE, value: DATA_TYPE[KEY_TYPE]): this {
    this.data[key] = value;
    return this;
  }

  public getData() : DATA_TYPE {
    this.data.traceId = "TO DO";
    return this.data;
  }

  // public setMessageData(data : DATA_TYPE) : void {
  //   this.data = data;
  // }

  public getMessage() {
    return {
      id: this.getMessageId(),
      data: this.getData()
    }
  }
}
