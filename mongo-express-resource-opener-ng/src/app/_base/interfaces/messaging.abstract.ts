
export abstract class MessagingAbstract<DATA_TYPE> {

  protected data : DATA_TYPE;

  constructor(data : DATA_TYPE) {
    this.data = data;
  }

  public abstract getMessageId() : number;

  public setMessageData(data : DATA_TYPE) : void {
    this.data = data;
  }

  public getMessage() {
    return {
      id: this.getMessageId(),
      data: this.data
    }
  }
}
