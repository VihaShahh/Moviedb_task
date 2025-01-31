# Postman API Documentation

### Base URL
```
http://localhost:5000/api
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

### Movies
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

