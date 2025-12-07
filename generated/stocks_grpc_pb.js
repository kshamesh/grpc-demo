// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var stocks_pb = require('./stocks_pb.js');

function serialize_stocks_StockPrice(arg) {
  if (!(arg instanceof stocks_pb.StockPrice)) {
    throw new Error('Expected argument of type stocks.StockPrice');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocks_StockPrice(buffer_arg) {
  return stocks_pb.StockPrice.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocks_StockRequest(arg) {
  if (!(arg instanceof stocks_pb.StockRequest)) {
    throw new Error('Expected argument of type stocks.StockRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocks_StockRequest(buffer_arg) {
  return stocks_pb.StockRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var StockServiceService = exports.StockServiceService = {
  // Bi-directional streaming API
streamPrices: {
    path: '/stocks.StockService/StreamPrices',
    requestStream: true,
    responseStream: true,
    requestType: stocks_pb.StockRequest,
    responseType: stocks_pb.StockPrice,
    requestSerialize: serialize_stocks_StockRequest,
    requestDeserialize: deserialize_stocks_StockRequest,
    responseSerialize: serialize_stocks_StockPrice,
    responseDeserialize: deserialize_stocks_StockPrice,
  },
};

exports.StockServiceClient = grpc.makeGenericClientConstructor(StockServiceService, 'StockService');
