#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "Testing Collectiverse API endpoints..."

# Test public endpoint
echo -e "\n${GREEN}Testing public endpoint...${NC}"
curl -X GET http://localhost:8080/api/test/public

# Register a new user (email and password only)
echo -e "\n\n${GREEN}Registering new user (email and password only)...${NC}"
REGISTER_RESPONSE=$(curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test1@example.com",
    "password": "password123"
  }')
echo $REGISTER_RESPONSE

# Extract token from response
TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo -e "\n${RED}Failed to get token from registration response (email/password only)${NC}"
else
    # Test get current user
echo -e "\n\n${GREEN}Testing get current user (after minimal registration)...${NC}"
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer $TOKEN"

    # Test profile completion (update profile)
    echo -e "\n\n${GREEN}Completing profile (set username, firstName, lastName)...${NC}"
    UPDATE_RESPONSE=$(curl -X PUT http://localhost:8080/api/users/profile \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "username": "testuser1",
        "firstName": "Test",
        "lastName": "User"
      }')
    echo $UPDATE_RESPONSE
fi

# Register a new user (all fields)
echo -e "\n\n${GREEN}Registering new user (all fields)...${NC}"
REGISTER_RESPONSE2=$(curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser2",
    "email": "test3@example.com",
    "password": "password123",
    "firstName": "Test2",
    "lastName": "User2"
  }')
echo $REGISTER_RESPONSE2

# Extract token from response
TOKEN2=$(echo $REGISTER_RESPONSE2 | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN2" ]; then
    echo -e "\n${RED}Failed to get token from registration response (all fields)${NC}"
else
    # Test get current user
echo -e "\n\n${GREEN}Testing get current user (after full registration)...${NC}"
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer $TOKEN2"
fi

echo -e "\n\n${GREEN}Tests completed!${NC}" 