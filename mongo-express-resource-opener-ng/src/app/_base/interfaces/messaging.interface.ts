export interface PutSettingsMessage {
  key: string,
  value: any
}

export interface FindDocumentMessage {
  resourceId: string
}

export interface MessageResponse {
  status: string,
  data: any
}

export enum MessageResponseStatus {
  OK = "OK",
  FAIL = "FAIL"
}
