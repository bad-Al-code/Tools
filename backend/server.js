import express from "express";
import helmet from "helmet";

import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:https";
import fs from "node:fs";

const PORT = 9000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());

app.get("/secret", (req, res) => {
  res.send("SECRET: 021983");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/**
 * Genereate  the certificate and key {COPIED FROM NODE HTTPS DOCS}
 *
 * openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout private-key.pem -out certificate.pem
 */
const options = {
  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
};

createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
