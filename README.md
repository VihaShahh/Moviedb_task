# Movie Database Management Website

## Introduction
This project is a full-stack web application designed to manage movie data efficiently. Users can add, update, delete, and fetch movie details. The system includes user authentication and role-based access control.

## Project Requirements

### Overview
The Movie Database Management Website provides a platform for users to interact with a movie database through a user-friendly interface. The system consists of both a frontend and a backend that must be set up for development.

### Prerequisites
To run this project, you need to have the following installed:
- Node.js (v16 or later)
- npm (latest recommended version)
- MongoDB (for database management)
- Postman (for API testing)
- Git (for version control)

### Dependencies
#### Frontend
The frontend is built with:
- React.js
- Material UI
- Axios (for API calls)
- React Router DOM (for navigation)

#### Backend
The backend is built with:
- Express.js (Node.js framework)
- MongoDB & Mongoose (for database interaction)
- JWT (for authentication)
- bcrypt (for password hashing)
- CORS (for cross-origin requests)

## Installation

### Cloning the Repository
```bash
git clone "https://github.com/VihaShahh/Moviedb_task"
cd Moviedb_task
```

### Setting up the Frontend
```bash
cd frontend
npm install
npm run dev
```

### Setting up the Backend
Open a new terminal and run:
```bash
cd backend
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in the backend directory with the following values:
```
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
```

## API Documentation (Postman)

### Base URL
```
http://localhost:5000
```

### Authentication

#### 1. User Signup
- Endpoint: `/auth/signup`
- Method: POST
- Body:
```json
{
  "name": "Viha Shah",
  "email": "viha@example.com",
  "password": "securepassword"
}
```
- Response:
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

#### 2. User Login
- Endpoint: `/auth/login`
- Method: POST
- Body:
```json
{
  "email": "viha@example.com",
  "password": "securepassword"
}
```
- Response:
```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

### Movies API

#### 3. Add a Movie (Admin Only)
- Endpoint: `/movies`
- Method: POST
- Headers:
  - `Authorization: Bearer jwt_token_here`
- Body:
```json
{
  "title": "Inception",
  "director": "Christopher Nolan",
  "releaseYear": 2010
}
```
- Response:
```json
{
  "message": "Movie added successfully",
  "movie": {
    "id": "movie_id_here",
    "title": "Inception"
  }
}
```

#### 4. Fetch All Movies
- Endpoint: `/movies`
- Method: GET
- Response:
```json
[
  {
    "id": "movie_id_here",
    "title": "Inception",
    "director": "Christopher Nolan",
    "releaseYear": 2010
  }
]
```

#### 5. Delete a Movie (Admin Only)
- Endpoint: `/movies/:id`
- Method: DELETE
- Headers:
  - `Authorization: Bearer jwt_token_here`
- Response:
```json
{
  "message": "Movie deleted successfully"
}
```

## API Requirements
The API should support:
- CRUD operations for movies (Create, Read, Update, Delete)
- User authentication (Signup, Login, JWT-based authentication)
- Role-based access control (Admin, User)

