
/**
 *  Request
 */

export interface MessageBase {
  traceId: string
}

export interface GetSettingsMessage extends MessageBase {
  key: string | null | undefined
}

export interface PutSettingsMessage extends MessageBase {
  key: string,
  value: any
}

export interface FindDocumentMessage extends MessageBase {
  resourceId: string
}

export interface OpenInNewTabMessage extends MessageBase {
  url: string[]
}

export interface CryptoUtilCipheringMesssage extends MessageBase {
  text: string,
  secret: string
}

export interface CryptoUtilGenerateRandomPassMessage extends MessageBase {
  length: number
}

/**
 *  Response
 */

export interface MessageResponse {
  status: string,
  data: any
}

export enum MessageResponseStatus {
  OK = "OK",
  FAIL = "FAIL"
}
