const net = require('net');

const LOCAL_PORT = 3000;
const BACKEND_PORTS = [3001, 3002, 3003, 3004];
let currIndex = 0;

const server = net.createServer((clientSocket) => {
  const targetPort = BACKEND_PORTS[currIndex];
  currIndex = (currIndex + 1) % BACKEND_PORTS.length;

  console.log(
    `[LB] Routing incoming client connection -> Backend Port ${targetPort}`,
  );

  const backendSocket = net.createConnection({ port: targetPort }, () => {
    clientSocket.pipe(backendSocket);
    backendSocket.pipe(clientSocket);
  });

  clientSocket.on("error", (err) => {
    console.log(`[LB] Client connection error: ${err.message}`);
  });

  backendSocket.on("error", (err) => {
    console.log(`[LB] Backend port ${targetPort} unreachable: ${err.message}`);
    clientSocket.write(
      `503 Service Unavailable: Backend Node ${targetPort} offline. \n`,
    );
    clientSocket.end();
  });
});

server.listen(LOCAL_PORT, () => {
    console.log(`[Load Balancer] Online and Listening on port ${LOCAL_PORT}`);
    console.log(`[Load Balancer] Routing pool: [${BACKEND_PORTS.join(", ")}]`);
});