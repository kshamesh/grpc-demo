// package: stocks
// file: stocks.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class StockRequest extends jspb.Message {
  getSymbol(): string;
  setSymbol(value: string): StockRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StockRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: StockRequest
  ): StockRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: StockRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): StockRequest;
  static deserializeBinaryFromReader(
    message: StockRequest,
    reader: jspb.BinaryReader
  ): StockRequest;
}

export namespace StockRequest {
  export type AsObject = {
    symbol: string;
  };
}

export class StockPrice extends jspb.Message {
  getSymbol(): string;
  setSymbol(value: string): StockPrice;
  getPrice(): number;
  setPrice(value: number): StockPrice;
  getTimestamp(): number;
  setTimestamp(value: number): StockPrice;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StockPrice.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: StockPrice
  ): StockPrice.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: StockPrice,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): StockPrice;
  static deserializeBinaryFromReader(
    message: StockPrice,
    reader: jspb.BinaryReader
  ): StockPrice;
}

export namespace StockPrice {
  export type AsObject = {
    symbol: string;
    price: number;
    timestamp: number;
  };
}
