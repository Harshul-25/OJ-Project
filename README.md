# Online Judge Platform

## Description

A simple online judge platform built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to register, log in, view programming problems, submit solutions in various languages (C++, C, Python), view their submission history, and use a basic code IDE.

## Features

*   User registration and login with JWT authentication.
*   Browse a list of programming problems.
*   View individual problem statements.
*   Submit code solutions for problems in C, C++, and Python.
*   Run code against custom input in a dedicated IDE page.
*   View submission history with verdicts (Accepted, Wrong Answer, Error).
*   Syntax highlighting and code editing powered by Monaco Editor.
*   Resizable panels for problem statement and editor.
*   Light/Dark theme toggle.
*   Responsive design for various screen sizes.

## Technology Stack

*   **Frontend:**
    *   React.js
    *   React Router DOM (for routing)
    *   Axios (for API requests)
    *   Monaco Editor (for code editor)
    *   react-resizable-panels (for resizable layout)
    *   CSS3 (for styling)
*   **Backend:**
    *   Node.js
    *   Express.js (for API framework)
    *   Mongoose (for MongoDB object modeling)
    *   bcrypt (for password hashing)
    *   jsonwebtoken (for JWT generation/verification)
    *   dotenv (for environment variables)
*   **Database:**
    *   MongoDB
*   **Code Execution:**
    *   Node.js `child_process` to execute C, C++, Python code.

## Setup and Installation

1.  **Clone the Repository:**
    ```bash
    git clone git@github.com:Harshul-25/OJ-Project.git
    cd OJ-Project
    ```

2.  **Install Server Dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Install Client Dependencies:**
    ```bash
    cd ../client
    npm install
    ```

4.  **Set Up Environment Variables (Server):**
    *   Navigate to the `server` directory.
    *   Create a `.env` file by copying the example or creating a new one.
    *   Add the following variables:
        ```dotenv
        MONGODB_URI=your_mongodb_connection_string # Replace with your MongoDB connection URI
        JWT_SECRET=your_very_secret_jwt_key       # Replace with a strong secret key for JWT
        PORT=5000                                 # Or any port you prefer for the backend
        ```

## Running the Application

1.  **Start the Backend Server:**
    *   Navigate to the `server` directory.
    *   Run the command (assuming your entry point is `server.js` or defined in `package.json`'s `start` script):
        ```bash
        npm start 
        # or node server.js
        ```
    *   The server should start, typically on port 8000 (or the one defined in `.env`).

2.  **Start the Frontend Client:**
    *   Open a *new* terminal.
    *   Navigate to the `client` directory.
    *   Run the command:
        ```bash
        npm start
        ```
    *   This will start the React development server, usually on port 3000, and open the application in your default browser.

3.  **Access the Application:**
    *   Open your browser and go to `http://localhost:3000` (or the port specified by the React dev server).

## Project Structure

```
OJ-Project/
├── client/         # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── Components/ # React components
│   │   ├── contexts/   # React context (e.g., ThemeContext)
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── ...
├── server/         # Node.js Backend
│   ├── codes/        # Directory to store temporary code files
│   ├── controllers/  # Request handling logic
│   ├── models/       # Mongoose models (e.g., User, Problem, Submission)
│   ├── routes/       # API route definitions
│   ├── .env          # Environment variables (ignored by git)
│   ├── .gitignore
│   ├── db.js         # Database connection logic
│   ├── checkToken.js # JWT middleware (example)
│   ├── generateJWT.js# JWT generation helper (example)
│   ├── executeFile.js# Logic for executing code files
│   ├── generateFile.js# Logic for creating code files
│   ├── package.json
│   ├── server.js     # Server entry point
│   └── ...
└── README.md       # Project Readme
```

## Notes

*   Ensure MongoDB is running and accessible via the connection string provided in the `.env` file.
*   The code execution relies on having `gcc`, `g++`, and `python3` installed and available in the server's environment PATH. 