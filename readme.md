# Custom Layer 4 TCP Load Balancer & SRE Watchdog

A lightweight, high-performance Layer 4 (Transport Layer) load balancer built from scratch using Node.js, paired with an automated Bash-based system watchdog daemon. This project demonstrates core Site Reliability Engineering (SRE) principles, network routing, and system resilience.

## 🚀 Features
* **Layer 4 Routing:** Direct TCP packet forwarding and stream piping using Node's native `net` module.
* **Round-Robin Algorithm:** Evenly distributes incoming connections across a pool of active backend servers.
* **Graceful Error Handling:** Catches socket disconnects (`ECONNRESET`) to prevent application crashes during packet drops.
* **SRE Watchdog Daemon:** A Bash script that continuously monitors backend nodes and automatically restarts them upon failure (Self-Healing).

## 🛠️ Tech Stack
* **JavaScript / Node.js** (Core routing engine, TCP socket manipulation)
* **Bash** (System orchestration, automated remediation)
* **Linux / Netcat** (Process monitoring and socket testing)

## ⚙️ Quick Start

1. **Clone the repository:**
   `git clone https://github.com/yourusername/layer4-tcp-loadbalancer.git`
   `cd layer4-tcp-loadbalancer`

2. **Start the backend servers:**
   `node backend.js 3001`
   `node backend.js 3002`

3. **Start the Load Balancer:**
   `node balancer.js`

4. **Start the Watchdog:**
   `./watchdog.sh 3001`

5. **Test Traffic Flow:**
   `for i in {1..6}; do nc localhost 3000; done`
