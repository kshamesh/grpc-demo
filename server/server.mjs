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

// ---- Bi-Directional Streaming Handler ----
function streamPrices(call) {
  console.log("Client connected to streamPrices");

  call.on("data", (req) => {
    console.log("Received symbol:", req.symbol);

    // Simulate sending a stream of price updates
    const price = (Math.random() * 1000).toFixed(2);

    call.write({
      symbol: req.symbol,
      price: Number(price),
      timestamp: Date.now(),
    });
  });

  call.on("end", () => {
    console.log("Client stream ended");
    call.end();
  });
}

// ---- Start gRPC Server ----
const server = new grpc.Server();
server.addService(stocksProto.StockService.service, {
  StreamPrices: streamPrices,
});

const PORT = 50051;

server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`🚀 gRPC server running at http://localhost:${PORT}`);
    // server.start();
  }
);

// import grpc from "@grpc/grpc-js";

// // Generated CommonJS files → import with "* as"
// import * as grpcPkg from "../generated/stocks_grpc_pb.js";
// import * as pbPkg from "../generated/stocks_pb.js";

// const { StockServiceService } = grpcPkg.default || grpcPkg;
// const { StockPrice } = pbPkg.default || pbPkg;

// function getRandomPrice() {
//   return (100 + Math.random() * 50).toFixed(2);
// }

// const stockService = {
//   streamPrices: (call) => {
//     console.log("Client connected to StreamPrices ...");

//     call.on("data", (req) => {
//       const symbol = req.getSymbol();
//       console.log("Client requested:", symbol);

//       const interval = setInterval(() => {
//         const priceMsg = new StockPrice();
//         priceMsg.setSymbol(symbol);
//         priceMsg.setPrice(parseFloat(getRandomPrice()));
//         priceMsg.setTimestamp(Date.now());
//         call.write(priceMsg);
//       }, 1000);

//       call.on("end", () => {
//         console.log("Client stream ended");
//         clearInterval(interval);
//         call.end();
//       });
//     });
//   },
// };

// const server = new grpc.Server();
// server.addService(StockServiceService, stockService);

// server.bindAsync(
//   "0.0.0.0:50051",
//   grpc.ServerCredentials.createInsecure(),
//   () => {
//     console.log("🚀 gRPC server running at http://localhost:50051");
//     // server.start();
//   }
// );
