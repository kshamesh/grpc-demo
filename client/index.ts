import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const protoPath = path.join(__dirname, "../proto/user.proto");
const packageDefinition = protoLoader.loadSync(protoPath, {});
const userProto = grpc.loadPackageDefinition(packageDefinition).user as any;

// Create client
const client = new userProto.UserService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// Call GetUser
client.GetUser({ id: 1 }, (err: any, response: any) => {
  if (err) return console.error(err);

  console.log("User response:", response);
});

client.ListUsers({}, (err: any, response: any) => {
  // This callback will not be used for streaming
});

const stream = client.ListUsers({});

stream.on("data", (user: any) => {
  console.log("Streamed user:", user);
});

stream.on("end", () => {
  console.log("Stream ended.");
});

// CLIENT STREAMING DEMO
const createStream = client.CreateUsers((err: any, response: any) => {
  if (err) return console.error("Error:", err);

  console.log("Server response:", response);
});

// Send 3 users (or as many as you want)
createStream.write({ name: "John", email: "john@example.com" });
createStream.write({ name: "Jane", email: "jane@example.com" });
createStream.write({ name: "Alice", email: "alice@example.com" });
createStream.write({ name: "Bob", email: "bob@example.com" });
createStream.write({ name: "Charlie", email: "charlie@example.com" });

// End stream to let the server respond
createStream.end();
