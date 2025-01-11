import express from "express";

const app = express();

function wait(duration) {
  const timer = Date.now();
  while (Date.now() - timer < duration) {}
}

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/wait", (req, res) => {
  wait(5000);
  res.send("Okay");
});

app.listen(3000);
