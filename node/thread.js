import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { isMainThread, Worker } from "node:worker_threads";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (isMainThread) {
  new Worker(path.join(__dirname, "thread.js"));
  new Worker(path.join(__dirname, "thread.js"));
} else {
  console.log("Worker");
}
