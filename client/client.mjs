import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load proto
const PROTO_PATH = path.join(__dirname, "../proto/stocks.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const stocksProto = grpc.loadPackageDefinition(packageDefinition).stocks;

// Client instance
const client = new stocksProto.StockService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// ---- Start bidirectional stream ----
const stream = client.StreamPrices();

stream.on("data", (data) => {
  console.log(
    `📈 Price update: ${data.symbol} → ${data.price} @ ${data.timestamp}`
  );
});

stream.on("end", () => {
  console.log("Stream ended by server");
});

// ---- Send stock symbols every 1 second ----
const symbols = ["AAPL", "GOOG", "TSLA", "AMZN", "MSFT"];

let index = 0;
setInterval(() => {
  const symbol = symbols[index % symbols.length];
  console.log("Sending request for:", symbol);

  stream.write({ symbol });
  index++;
}, 1000);

// import grpc from "@grpc/grpc-js";

// // Generated CommonJS files → import with "* as"
// import * as grpcPkg from "../generated/stocks_grpc_pb.js";
// import * as pbPkg from "../generated/stocks_pb.js";

// const { StockServiceClient } = grpcPkg.default || grpcPkg;
// const { StockRequest } = pbPkg.default || pbPkg;

// const client = new StockServiceClient(
//   "localhost:50051",
//   grpc.credentials.createInsecure()
// );

// // Start bi-directional stream
// const stream = client.streamPrices();

// console.log("📡 Connected to server, sending stock symbols...");

// // Send multiple symbols
// ["AAPL", "GOOG", "MSFT", "AMZN", "TSLA"].forEach((symbol, i) => {
//   setTimeout(() => {
//     const req = new StockRequest();
//     req.setSymbol(symbol);
//     console.log("➡️ Sending:", symbol);
//     stream.write(req);
//   }, i * 1000);
// });

// // Read price updates
// stream.on("data", (price) => {
//   console.log(
//     `📈 ${price.getSymbol()} - $${price.getPrice()} (ts: ${price.getTimestamp()})`
//   );
// });

// stream.on("end", () => console.log("Stream ended"));
