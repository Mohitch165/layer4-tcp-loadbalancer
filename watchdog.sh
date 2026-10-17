TARGET_PORT=(3001 3002 3003 3004)

echo "Starting SRE Watchdog for ports ${TARGET_PORT[*]}..."

while true; do
    for PORT in "${TARGET_PORT[@]}"; do
        if nc -z -w 1 localhost $PORT > /dev/null 2>&1; then
        sleep 2
    else
        echo "[$(date -u)] CRITICAL: Backend on port $PORT is DOWN!"
        echo "[$(date -u)] ACTION: Automatically restarting process..."
        
        node backend.js $PORT &
        
        sleep 2
        echo "[$(date -u)] RECOVERY: Backend $PORT successfully restored."
    fi
done

sleep 1
done