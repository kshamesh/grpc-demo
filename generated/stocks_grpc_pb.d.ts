// package: stocks
// file: stocks.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as stocks_pb from "./stocks_pb";

interface IStockServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    streamPrices: IStockServiceService_IStreamPrices;
}

interface IStockServiceService_IStreamPrices extends grpc.MethodDefinition<stocks_pb.StockRequest, stocks_pb.StockPrice> {
    path: "/stocks.StockService/StreamPrices";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<stocks_pb.StockRequest>;
    requestDeserialize: grpc.deserialize<stocks_pb.StockRequest>;
    responseSerialize: grpc.serialize<stocks_pb.StockPrice>;
    responseDeserialize: grpc.deserialize<stocks_pb.StockPrice>;
}

export const StockServiceService: IStockServiceService;

export interface IStockServiceServer extends grpc.UntypedServiceImplementation {
    streamPrices: grpc.handleBidiStreamingCall<stocks_pb.StockRequest, stocks_pb.StockPrice>;
}

export interface IStockServiceClient {
    streamPrices(): grpc.ClientDuplexStream<stocks_pb.StockRequest, stocks_pb.StockPrice>;
    streamPrices(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<stocks_pb.StockRequest, stocks_pb.StockPrice>;
    streamPrices(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<stocks_pb.StockRequest, stocks_pb.StockPrice>;
}

export class StockServiceClient extends grpc.Client implements IStockServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public streamPrices(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<stocks_pb.StockRequest, stocks_pb.StockPrice>;
    public streamPrices(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<stocks_pb.StockRequest, stocks_pb.StockPrice>;
}
