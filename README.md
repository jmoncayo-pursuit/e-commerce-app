# Collectiverse

A curated online storefront for enthusiasts of comic books, action figures, retro video games/systems, and related collectibles.

## Tech Stack

- Frontend: React (Vite)
- Backend: Java Spring Boot
- Database: PostgreSQL
- Image Storage: Firebase
- Deployment: Firebase Hosting (Frontend) & Render (Backend)

## Prerequisites

- Node.js (v18+)
- Java JDK 17
- Maven
- PostgreSQL
- Firebase account (for image storage and hosting)
- Firebase CLI (`npm install -g firebase-tools`)

## Project Structure

```
collectiverse/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── assets/    # Static assets
│   │   ├── components/# Reusable components
│   │   ├── pages/     # Page components
│   │   ├── App.jsx    # Main app component
│   │   ├── main.jsx   # Entry point
│   │   └── firebase.js# Firebase configuration
│   ├── .firebaserc    # Firebase project settings
│   ├── firebase.json  # Firebase hosting config
│   └── package.json   # Frontend dependencies
│
├── backend/           # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/collectiverse/
│   │       │   ├── config/      # Configuration classes
│   │       │   ├── controller/  # REST controllers
│   │       │   ├── model/       # Entity classes
│   │       │   ├── repository/  # Data repositories
│   │       │   └── service/     # Business logic
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml       # Backend dependencies
│
└── README.md         # Project documentation
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

3. Create a `.env` file in the frontend directory with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Firebase Hosting Setup

1. Install Firebase CLI globally (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init
   ```
   - Select "Hosting"
   - Choose "Use an existing project" and select your Firebase project
   - Use "dist" as your public directory
   - Configure as a single-page app
   - Don't overwrite index.html

4. Deploy to Firebase:
   ```bash
   npm run deploy
   ```

5. For preview deployments:
   ```bash
   npm run deploy:preview
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a PostgreSQL database named 'collectiverse'

3. Update `src/main/resources/application.properties` with your database credentials

4. Build and run the application:
   ```bash
   mvn spring-boot:run
   ```

## Features

- User authentication and profile management
- Product listing creation and management
- Shopping cart functionality
- Simulated checkout process
- Image upload support via Firebase
- Search and filtering capabilities
- Fast and secure hosting via Firebase Hosting

