#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "Testing Collectiverse API endpoints..."

# Test public endpoint
echo -e "\n${GREEN}Testing public endpoint...${NC}"
curl -X GET http://localhost:8080/api/test/public

# Register a new user
echo -e "\n\n${GREEN}Registering new user...${NC}"
REGISTER_RESPONSE=$(curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }')

echo $REGISTER_RESPONSE

# Extract token from response
TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo -e "\n${RED}Failed to get token from registration response${NC}"
    exit 1
fi

# Test private endpoint with token
echo -e "\n\n${GREEN}Testing private endpoint with token...${NC}"
curl -X GET http://localhost:8080/api/test/private \
  -H "Authorization: Bearer $TOKEN"

# Test admin endpoint with token (should fail)
echo -e "\n\n${GREEN}Testing admin endpoint with token (should fail)...${NC}"
curl -X GET http://localhost:8080/api/test/admin \
  -H "Authorization: Bearer $TOKEN"

# Test getting current user
echo -e "\n\n${GREEN}Testing get current user...${NC}"
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer $TOKEN"

# Test logout
echo -e "\n\n${GREEN}Testing logout...${NC}"
curl -X POST http://localhost:8080/api/auth/logout \
  -H "Authorization: Bearer $TOKEN"

# Test private endpoint after logout (should fail)
echo -e "\n\n${GREEN}Testing private endpoint after logout (should fail)...${NC}"
curl -X GET http://localhost:8080/api/test/private \
  -H "Authorization: Bearer $TOKEN"

echo -e "\n\n${GREEN}Tests completed!${NC}" 