import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Load the proto file
const protoPath = path.join(__dirname, "../proto/user.proto");
const packageDefinition = protoLoader.loadSync(protoPath, {});
const userProto = grpc.loadPackageDefinition(packageDefinition).user as any;

// 2. Implement the service functions
const userService = {
  GetUser: (call: any, callback: any) => {
    const userId = call.request.id;

    // Fake data – later we'll connect to DB or streaming
    const user = {
      id: userId,
      name: "John Doe",
      email: "john@example.com",
    };

    callback(null, user);
  },
  ListUsers: (call: any) => {
    const users = [
      { id: 2, name: "Alisha Smith", email: "alisha@example.com" },
      { id: 3, name: "Peter Parker", email: "peter@example.com" },
      { id: 4, name: "Alice", email: "alice@example.com" },
      { id: 5, name: "Bob", email: "bob@example.com" },
      { id: 6, name: "Charlie", email: "charlie@example.com" },
    ];

    users.forEach((user, idx) => {
      setTimeout(() => call.write(user), idx * 500);
    });

    setTimeout(() => call.end(), users.length * 500);
  },
  CreateUsers: (call: any, callback: any) => {
    let count = 0;

    call.on("data", (user: any) => {
      console.log("Received user:", user);
      count++;
    });

    call.on("end", () => {
      callback(null, { count });
    });
  },
};

// 3. Start the server
const server = new grpc.Server();
server.addService(userProto.UserService.service, userService);

const PORT = 50051;

server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`🚀 gRPC server running at 0.0.0.0:${port}`);
    // ❌ REMOVE server.start(), it's no longer required
  }
);
