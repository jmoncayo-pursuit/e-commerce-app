#!/bin/bash

# Collectiverse Development Script
set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down servers...${NC}"
    kill $(jobs -p) 2>/dev/null || true
    exit 0
}
trap cleanup SIGINT SIGTERM EXIT

# Check requirements silently
check_requirements() {
    if ! command -v java &> /dev/null; then
        echo -e "${RED}Error: Java not found${NC}"
        exit 1
    fi
    if ! command -v node &> /dev/null; then
        echo -e "${RED}Error: Node.js not found${NC}"
        exit 1
    fi
}

# Setup frontend if needed
setup_frontend() {
    cd frontend
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}Installing frontend dependencies...${NC}"
        npm install --silent
    fi
    cd ..
}

# Start servers
start_servers() {
    echo -e "${GREEN}Starting development servers...${NC}"
    
    # Backend
    cd backend
    if [ -f "./mvnw" ]; then
        ./mvnw spring-boot:run -q &
    else
        mvn spring-boot:run -q &
    fi
    cd ..
    
    # Frontend
    cd frontend
    npm run dev --silent &
    cd ..
}

# Wait for readiness
wait_for_ready() {
    echo -e "${YELLOW}Waiting for servers...${NC}"
    
    # Wait for backend
    while ! curl -s http://localhost:8080/actuator/health > /dev/null 2>&1; do
        sleep 1
    done
    
    # Wait for frontend
    while ! curl -s http://localhost:5173 > /dev/null 2>&1; do
        sleep 1
    done
}

# Main
main() {
    check_requirements
    setup_frontend
    start_servers
    wait_for_ready
    
    echo -e "${GREEN}Ready! Frontend: http://localhost:5173 | Backend: http://localhost:8080${NC}"
    echo -e "${YELLOW}Press Ctrl+C to stop${NC}"
    wait
}

main 