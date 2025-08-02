# PickleMatch Backend API

A Node.js/Express backend API for the PickleMatch mobile app with MySQL database.

## Features

- 🔐 **Authentication**: JWT-based authentication with secure password hashing
- 👤 **User Management**: Complete user profile management
- 📸 **Avatar Upload**: File upload for user avatars
- 🏆 **Player Stats**: Track player rank, ELO rating, and description
- 🔒 **Security**: Password hashing, JWT tokens, and session management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT + bcryptjs
- **File Upload**: Multer
- **CORS**: Enabled for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## Installation

1. **Clone the repository and navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=picklematch_db
   DB_PORT=3306
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d
   UPLOAD_PATH=./uploads
   MAX_FILE_SIZE=5242880
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Create MySQL database**
   ```sql
   CREATE DATABASE picklematch_db;
   ```

5. **Start the server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

#### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "avatar": null,
    "date_of_birth": null,
    "location": null,
    "rank": "Beginner",
    "elo": 1000,
    "description": null
  }
}
```

#### POST `/api/auth/signin`
Login user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/logout`
Logout user (requires authentication).

#### GET `/api/auth/me`
Get current user profile (requires authentication).

### Profile Management

#### GET `/api/profile`
Get user profile (requires authentication).

#### PUT `/api/profile`
Update user profile (requires authentication).

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "1990-01-01",
  "location": "New York, NY",
     "player_rank": "Intermediate",
   "elo": 1200,
   "description": "Passionate pickleball player"
}
```

#### POST `/api/profile/avatar`
Upload avatar image (requires authentication).

**Request:** Multipart form data with `avatar` field.

#### DELETE `/api/profile/avatar`
Delete avatar (requires authentication).

#### PUT `/api/profile/password`
Change password (requires authentication).

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

### Health Check

#### GET `/api/health`
Check API status.

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar VARCHAR(500),
  date_of_birth DATE,
  location VARCHAR(255),
     player_rank VARCHAR(50) DEFAULT 'Beginner',
  elo INT DEFAULT 1000,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### User Sessions Table
```sql
CREATE TABLE user_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(500) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Security Features

- **Password Hashing**: bcryptjs with 12 salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Session Management**: Database-stored sessions with expiration
- **Input Validation**: Request body validation
- **File Upload Security**: File type and size restrictions
- **CORS**: Configurable cross-origin resource sharing

## Development

### Running in Development Mode
```bash
npm run dev
```

### Environment Variables
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `DB_HOST`: MySQL host
- `DB_USER`: MySQL username
- `DB_PASSWORD`: MySQL password
- `DB_NAME`: MySQL database name
- `DB_PORT`: MySQL port (default: 3306)
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRES_IN`: JWT token expiration (default: 7d)
- `UPLOAD_PATH`: File upload directory
- `MAX_FILE_SIZE`: Maximum file size in bytes
- `CORS_ORIGIN`: Allowed CORS origin

## File Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── middleware/
│   ├── auth.js              # Authentication middleware
│   └── upload.js            # File upload middleware
├── routes/
│   ├── auth.js              # Authentication routes
│   └── profile.js           # Profile management routes
├── uploads/                 # Uploaded files directory
├── server.js                # Main server file
├── package.json
├── env.example
└── README.md
```

## License

ISC 