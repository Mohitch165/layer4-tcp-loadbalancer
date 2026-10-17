const net = require("net");

const port = process.argv[2] || 3000;

let firstConnection = true;

const server = net.createServer((socket) => {
    if (firstConnection){
        console.log(
        `[+] New TCP connection established on backned node (Port ${port})`,
        );
        firstConnection = false;
    }

  socket.on("error", (err) => {
    if (err.code !== "ECONNRESET") {
      console.error(`[!] Socket error: ${err.message}`);
    }
  });

  socket.write(
    `SUCCESS: Response received from Backend node on Port ${port}\n`,
  );

  socket.end();
});

server.on("error", (err) => {
  console.error(`[!] Backend server error on port ${port}: ${err.message}`);
});

server.listen(port, () => {
  console.log(
    `[Backend Node] Active and listening for TCP traffic on port ${port}`,
  );
});
