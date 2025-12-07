# gRPC Demo - Bi-directional Streaming

A Node.js demonstration of gRPC bi-directional streaming using Protocol Buffers. This project shows how to implement a real-time stock price streaming service with gRPC.

## Features

- **Bi-directional Streaming**: Client and server can send/receive messages simultaneously
- **Real-time Updates**: Simulated stock price updates streamed in real-time
- **Protocol Buffers**: Type-safe message serialization
- **ES6 Modules**: Modern JavaScript with ESM support

## Project Structure

```
grpc-demo/
├── proto/                  # Protocol Buffer definitions
│   └── stocks.proto       # Service and message definitions
├── generated/             # Generated gRPC code (from protoc)
│   ├── stocks_pb.js       # Message types
│   └── stocks_grpc_pb.js  # Service definitions
├── server/
│   └── server.mjs         # gRPC server implementation
├── client/
│   └── client.mjs         # gRPC client implementation
├── package.json
└── README.md
```

## Prerequisites

- Node.js 16+ (with ES6 module support)
- npm or yarn

## Installation

```bash
npm install
```

## Generated Code

The project includes pre-generated gRPC code. If you need to regenerate from the proto files, you'll need:

```bash
npm install --save-dev grpc-tools protoc-gen-ts
```

Then regenerate with:

```bash
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:generated --grpc_out=grpc_js:generated proto/stocks.proto
```

## Running the Demo

### Start the Server

```bash
npm run start-server
```

The server will listen on `0.0.0.0:50051` and simulate stock price updates.

**Output:**

```
🚀 gRPC server running at http://localhost:50051
Client connected to StreamPrices ...
Client requested: AAPL
```

### Start the Client (in another terminal)

```bash
npm run start-client
```

The client will connect to the server and request price updates for AAPL, GOOG, and MSFT.

**Output:**

```
📡 Connected to server, sending stock symbols...
➡️ Sending: AAPL
📈 AAPL - $125.43 (ts: 1670419200000)
📈 AAPL - $126.12 (ts: 1670419201000)
...
```

## How It Works

### Server (`server/server.mjs`)

1. Imports generated gRPC service definitions
2. Creates a `StockService` with the `streamPrices` handler
3. For each client request:
   - Gets the requested stock symbol
   - Sends price updates every 1 second
   - Cleans up when the client disconnects

### Client (`client/client.mjs`)

1. Connects to the server at `localhost:50051`
2. Opens a bi-directional stream with `streamPrices()`
3. Sends requests for stock symbols: AAPL, GOOG, MSFT
4. Receives and logs price updates in real-time

### Protocol Definition (`proto/stocks.proto`)

```protobuf
syntax = "proto3";

package stocks;

service StockService {
  rpc StreamPrices(stream StockRequest) returns (stream StockPrice);
}

message StockRequest {
  string symbol = 1;
}

message StockPrice {
  string symbol = 1;
  double price = 2;
  int64 timestamp = 3;
}
```

## API Reference

### StockService

#### streamPrices (Bi-directional Stream)

**Request:** `StockRequest`

- `symbol` (string): Stock ticker symbol (e.g., "AAPL")

**Response:** `StockPrice`

- `symbol` (string): The requested symbol
- `price` (double): Current price
- `timestamp` (int64): Unix timestamp in milliseconds

## Troubleshooting

### "No connection established"

- Ensure the server is running on port 50051
- Check firewall settings

### "The server does not implement the method streamPrices"

- Verify the method name matches the service definition (lowercase `streamPrices`)
- Ensure the server is using the correct service definitions from generated code

### Import Errors

- CommonJS modules are imported as ES6 modules using `import * as`
- Exports are accessed via `.default` property when needed

## Dependencies

- **@grpc/grpc-js** (^1.14.2) - gRPC JavaScript implementation
- **@grpc/proto-loader** (^0.8.0) - Protocol Buffer loader (optional, using pre-generated code)

## Development Dependencies

- **ts-node** (^10.9.2) - TypeScript execution for Node.js
- **typescript** (^5.9.3) - TypeScript compiler
- **nodemon** (^3.1.11) - Auto-restart on file changes

## License

ISC

## Next Steps

- Add error handling and retry logic
- Implement health checks
- Add authentication/TLS
- Create additional services
- Add unit tests
