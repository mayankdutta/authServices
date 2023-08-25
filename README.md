# API Documentation

This documentation provides details about the routes and endpoints exposed by the `index.js` file located in the `route/v1` directory.

## Table of Contents

- [User Routes](#user-routes)
  - [User Signup](#user-signup)
  - [User Signin](#user-signin)
  - [Check User Authentication](#check-user-authentication)
  - [Check User Admin Status](#check-user-admin-status)
  - [Change User Role](#change-user-role)

---

## User Routes

### User Signup

**Endpoint:** `POST /signup`

Registers a new user.

**Request Headers:**

- `Content-Type: application/json`

**Request Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

### User Signin

**Endpoint:** `POST /signin`

Authenticates a user.

**Request Headers:**

- `Content-Type: application/json`

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

### Check User Authentication

**Endpoint:** `GET /isAuthenticated`

Checks if the user is authenticated.

**Response:**

```json
{
  "isAuthenticated": true
}
```

### Check User Admin Status

**Endpoint:** `POST /isAdmin`

Checks if the user is an admin.

**Request Headers:**

- `Content-Type: application/json`

**Request Body:**

```json
{
  "userId": "string"
}
```

**Response:**

```json
{
  "isAdmin": true
}
```

### Change User Role

**Endpoint:** `POST /toRole`

Changes the role of a user.

**Request Headers:**

- `Content-Type: application/json`

**Request Body:**

```json
{
  "userId": "string",
  "role": "string"
}
```

---

Please note that this documentation assumes the use of a RESTful API convention.
The routes and endpoints are based on the code provided in the `index.js` file.
Make sure to replace placeholders like `:userId` with actual values when making requests.
Additionally, ensure that you have implemented the required controller functions and middlewares as indicated in the code.
