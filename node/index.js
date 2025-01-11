import express from "express";
import cluster from "node:cluster";

const app = express();

function wait(duration) {
  const timer = Date.now();
  while (Date.now() - timer < duration) {}
}

app.get("/", (req, res) => {
  res.send(`Hello: ${process.pid}`);
});

app.get("/wait", (req, res) => {
  wait(8000);
  res.send(`Okay: ${process.pid}`);
});

if (cluster.isPrimary) {
  console.log("Master is running...");
  cluster.fork();
  cluster.fork();
} else {
  console.log("Worker is running...");
  app.listen(3000);
}
