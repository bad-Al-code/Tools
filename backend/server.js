import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = 9000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get("/secret", (req, res) => {
  res.send("SECRET: 021983");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT);
