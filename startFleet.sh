#!/bin/bash

echo "Booting up Layer 4 Infrastructure..."

node backend.js 3001 &
node backend.js 3002 &
node backend.js 3003 &
node backend.js 3004 &

sleep 1

echo "Starting Load Balancer..."
node balancer.js