# BackEnd_Appuama

This directory contains the backend API for the Formula SAE project, built with NestJS.

## Project Structure

- `api/BackEnd_Appuama/`: This is the current directory, containing the NestJS backend API.
- `frontend-apuama/`: Contains the Next.js frontend application.

## Technologies Used

### Backend (api/BackEnd_Appuama/)

-   NestJS (TypeScript)
-   Prisma (ORM)
-   PostgreSQL (Database)
-   JWT for Authentication

## Setup Instructions (Local Development with Docker Compose)

To set up and run the backend locally using Docker Compose (alongside the database and frontend):

1.  Navigate to the root directory of the monorepo (`formula-sae-app`).
2.  Ensure Docker is running on your machine.
3.  Run `docker compose build` to build all service images.
4.  Run `docker compose up -d` to start all services in detached mode.

The backend API will typically be accessible at `http://localhost:3000/api`.

## API Endpoints

Below is a summary of key API endpoints. For detailed request/response structures, please refer to the DTOs and OpenAPI documentation (if generated).

### 1. Authentication (`/auth`)
-   `POST /auth/login`: User login.
-   `POST /auth/signup`: User registration (initial unapproved state).

### 2. Users (`/users`)
-   `POST /users`: Create a new user (admin can use this to create approved users).
-   `GET /users`: Retrieve all users (Admin only).
-   `PATCH /users/:id`: Update user details, including approval status (Admin only).
-   `DELETE /users/:id`: Delete a user (Admin only).

### 3. Cars (`/cars`)
-   `POST /cars`: Add a new car.
-   `GET /cars`: Retrieve all cars.
-   `DELETE /cars/:id`: Remove a car.

### 4. Balance (`/balance`)
-   `POST /balance`: Save new balance data for a car.
-   `GET /balance/last/:carroId`: Get the latest balance data for a specific car.

### 5. Reports (`/reports`)
-   `POST /reports`: Create a new test report.
-   `GET /reports`: Retrieve all reports.
-   `GET /reports/car/:carroId`: Retrieve reports for a specific car.
-   `GET /reports/last`: Get the absolute latest report.
-   `DELETE /reports/:id`: Remove a report.

### 6. Checklist Items (`/checklist-items`)
-   `POST /checklist-items`: Add a new checklist item.
-   `GET /checklist-items`: Retrieve all checklist items.
-   `DELETE /checklist-items/:id`: Remove a checklist item.

## User Registration

The user registration functionality is handled by the `/users` and `/auth/signup` endpoints.

### POST `/auth/signup` (For new users requesting access)

This endpoint allows new individuals to register, typically entering an unapproved state awaiting administrator review.

**Request Body:**

```json
{
  "email": "novo.usuario@example.com",
  "fullName": "Novo Usuário",
  "matricula": "12345",
  "role": "membro", // "trainee", "membro", or "lider"
  "password": "umaSenhaForte123"
}
```

**Fields:**
- `email`: (string, required) The user's email address. Must be unique.
- `fullName`: (string, required) The full name of the user.
- `matricula`: (string, required) The user's unique academic or team registration number.
- `role`: (string, required) The user's role in the team (`"trainee"`, `"membro"`, or `"lider"`).
- `password`: (string, required) The user's password.

### POST `/users` (For Admin to create approved users)

Administrators can use this endpoint to directly create new, pre-approved user accounts.

**Request Body:**

```json
{
  "email": "admin.usuario@example.com",
  "nomeCompleto": "Admin Usuário",
  "matricula": "98765",
  "posicaoEquipe": "admin", // "trainee", "membro", "lider", or "admin"
  "senhaHash": "umaSenhaMuitoForte456", // Raw password, will be hashed by backend
  "isAprovado": true,
  "isAdmin": true
}
```

**Fields:**
- `email`: (string, required) The user's email address. Must be unique.
- `nomeCompleto`: (string, required) The full name of the user.
- `matricula`: (string, required) The user's unique academic or team registration number.
- `posicaoEquipe`: (string, required) The user's role in the team.
- `senhaHash`: (string, required) The raw password for the user. The backend will hash this.
- `isAprovado`: (boolean, optional, default `false`) Whether the user is approved.
- `isAdmin`: (boolean, optional, default `false`) Whether the user has administrator privileges.

## Database Schema (Physical Model)

The database schema is defined using Prisma. A visual representation (ERD) can be generated from `prisma/schema.prisma`.

You can find a Mermaid ERD code snippet in the `db_model.mermaid` file in the project root, which can be imported into tools like Draw.io for visualization.

## Running Tests

(Add instructions for running backend tests here if applicable)