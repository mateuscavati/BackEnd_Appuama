# Formula SAE App

This repository contains the monorepo for the Formula SAE project, which includes a backend API and a mobile application.

## Project Structure

- `api/`: Contains the backend API built with NestJS.
- `mobile/`: Contains the mobile application built with Expo/React Native.

## Technologies Used

### Backend (api/)

- NestJS (TypeScript)
- Prisma (ORM)
- PostgreSQL (Database - inferred)

### Mobile (mobile/)

- React Native
- Expo
- TypeScript

## Setup Instructions

Detailed setup instructions for both the backend and mobile applications will be provided in their respective directories.

## User Registration (Backend)

The user registration functionality is handled by the `UsersModule` in the backend API.

### Endpoint

- **POST** `/users`

### Request Body

The endpoint expects a JSON request body conforming to the `CreateUserDto` structure:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Fields:**
- `name`: (string, required) The name of the user.
- `email`: (string, required) The email address of the user. Must be a valid email format.
- `password`: (string, required) The user's password.

### Process

1.  Upon receiving a `POST` request to `/users`, the `UsersController` validates the request body against the `CreateUserDto`.
2.  The `UsersService` then takes the validated data.
3.  The provided password is hashed using `bcrypt` with a salt round of 10 for security.
4.  Finally, the user's information, including the hashed password, is stored in the database via Prisma.
