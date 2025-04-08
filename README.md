# Node.js Auth API with PostgreSQL, Sequelize and TypeScript

This is a simple authentication API built with Node.js, Express, TypeScript, Sequelize ORM, and PostgreSQL. It includes features such as:

- User registration with hashed passwords
- Login with JWT authentication
- CPF anonymization and format validation
- Layered architecture: Controllers, Services, DTOs, Utils
- Unit tests with Jest

## Features

- ✅ User registration and login
- ✅ JWT token generation
- ✅ CPF anonymization and format validation
- ✅ Database migrations
- ✅ Clean architecture with separation of concerns
- ✅ Unit tests for services, utils, and controllers
- ✅ Coverage reports with Jest

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Sequelize ORM
- bcrypt
- JWT (jsonwebtoken)
- Jest

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Steps

#### 1. Clone the repository:

    git clone https://github.com/Chavato/login.git
    cd login

#### 2. Create a .env file in the project root:

    JWT_SECRET=your_jwt_secret
    DB_HOST=db
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=postgres
    DB_NAME=auth_db

#### 3. Start the project using Docker Compose:

    docker-compose up --build -d

This will:

- Spin up a PostgreSQL container
- Run all migrations automatically
- Start the API server

You can access the API at: http://localhost:3000