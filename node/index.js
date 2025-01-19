import express from 'express';
// import cluster from "node:cluster";
// import os from "node:os";

const app = express();

function wait(duration) {
    const timer = Date.now();
    while (Date.now() - timer < duration) {}
}

app.get('/', (req, res) => {
    res.send(`Hello: ${process.pid}`);
});

app.get('/wait', (req, res) => {
    wait(8000);
    res.send(`Nice: ${process.pid}`);
});

// console.log(`CPU Numbers: ${os.cpus().length}`);
// if (cluster.isPrimary) {
//   console.log("Master is running...");
//   const NUMBER_OF_CPUS = os.cpus().length;
//   for (let cpu = 0; cpu < NUMBER_OF_CPUS; cpu++) {
//     cluster.fork();
//   }
// } else {
//   console.log("Worker is running...");
//   app.listen(3000);
// }
app.listen(3000);
