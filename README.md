# Collectiverse

A curated online storefront for enthusiasts of comic books, action figures, retro video games/systems, and related collectibles.

## Tech Stack

- Frontend: React (Vite)
- Backend: Java Spring Boot
- Database: MySQL
- Authentication: JWT-based authentication
- Styling: Custom CSS

## Prerequisites

- Node.js (v18+)
- Java JDK 17
- Maven
- MySQL

## Project Structure

```
collectiverse/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── assets/     # Static assets
│   │   ├── components/ # Reusable components
│   │   │   ├── auth/   # Authentication components
│   │   │   ├── cart/   # Shopping cart components
│   │   │   ├── common/ # Shared UI components
│   │   │   └── layout/ # Layout components (Navbar, Footer)
│   │   ├── pages/      # Page components
│   │   ├── services/   # API service layer
│   │   ├── stores/     # State management (Zustand)
│   │   ├── App.jsx     # Main app component
│   │   └── main.jsx    # Entry point
│   ├── public/         # Public assets
│   └── package.json    # Frontend dependencies
│
├── backend/            # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/collectiverse/
│   │       │   ├── config/       # Configuration classes
│   │       │   ├── controller/   # REST controllers
│   │       │   ├── dto/          # Data transfer objects
│   │       │   ├── exception/    # Exception handling
│   │       │   ├── interceptor/  # Request interceptors
│   │       │   ├── model/        # Entity classes
│   │       │   ├── repository/   # Data repositories
│   │       │   ├── security/     # Security configuration
│   │       │   └── service/      # Business logic
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml         # Backend dependencies
│
└── README.md           # Project documentation
```

## Getting Started

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a MySQL database named 'collectiverse'

3. Update `src/main/resources/application.properties` with your database credentials

4. Build and run the application:
   ```bash
   mvn spring-boot:run
   ```

## Features

- User authentication and profile management
- Product listing and browsing
- Shopping cart functionality
- Checkout process
- Search and filtering capabilities
- Responsive design for mobile and desktop
