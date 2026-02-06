# Animal Shelter Web Application (Backend)

## Project Overview
This project is a backend web application developed to support animal shelter operations by providing a centralized and reliable way to manage animal records and adoption-related workflows.

The application exposes RESTful API endpoints that allow public users to view available animals while restricting administrative actions, such as creating, updating, or deleting animal records, to authorized users.

## Technologies Used
- Node.js
- Express.js
- MySQL
- Multer (file uploads)
- dotenv (environment configuration)
- Postman (API testing)
- Git/GitHub (version control)

## Features
- Retrieve all animals
- Retrieve an animal by ID
- Create new animal records (admin only)
- Update animal records (admin only)
- Delete animal records (admin only)
- Upload and serve animal photos
- Role-based access control using middleware

## Database Setup
This project uses a MySQL database with a single primary table:

- `Animal`

The SQL script provided in this submission creates the required table schema.  
User authentication is enforced at the application layer using middleware and does not require a separate user or admin database table for this implementation.

## Running the Application
1. Install dependencies:
   ```bash
   npm install
