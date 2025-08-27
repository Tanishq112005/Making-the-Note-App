# NotesApp: A Full-Stack Note-Taking Application

Welcome to NotesApp! This is a modern, full-stack web application designed to help you capture, organize, and manage your thoughts and ideas seamlessly. It features a sleek, intuitive frontend built with React and a powerful, high-performance backend powered by FastAPI.

---

## ✨ Features

-   **User Authentication**: Secure sign-up and login functionality using JWT (JSON Web Tokens) to protect user data.
-   **Create, Read, Update, Delete (CRUD) Notes**: A full suite of features allowing users to create new notes, view all their existing notes, edit them in a modal, and delete them.
-   **Modern UI/UX**: A clean, responsive, and user-friendly interface with a professional yellow and white color scheme.
-   **Protected Routes**: The main notes dashboard is a protected route, accessible only to authenticated users.
-   **State Management**: Centralized and predictable state management on the frontend using Redux Toolkit.

---

## 🛠️ Tech Stack

This project is built with a modern technology stack, ensuring a high-performance and scalable application.

#### **Frontend**

-   **React**: A popular JavaScript library for building user interfaces.
-   **TypeScript**: Adds static typing to JavaScript for improved code quality and maintainability.
-   **Redux Toolkit**: The official, opinionated toolset for efficient Redux development.
-   **React Router**: For handling client-side routing and navigation.
-   **Axios**: A promise-based HTTP client for making API requests to the backend.
-   **React Icons**: For including popular icons in the application.

#### **Backend**

-   **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python.
-   **Uvicorn**: A lightning-fast ASGI server, used to run the FastAPI application in production.
-   **Pydantic**: For data validation and settings management.
-   **PostgreSQL / Your Database**: (You can specify your database here) for data persistence.

---

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### **Prerequisites**

-   Node.js and npm (or yarn) installed on your machine.
-   Python 3.8+ and pip installed.
-   A running instance of your chosen database (e.g., PostgreSQL).

### **Backend Setup**

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # Create the environment
    python -m venv .venv

    # Activate on Windows
    .\.venv\Scripts\activate

    # Activate on macOS/Linux
    source .venv/bin/activate
    ```

3.  **Install the required Python packages:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up your environment variables:**
    Create a `.env` file in the `backend` directory and add your database URL and any other secret keys.
    ```env
    DATABASE_URL="your_database_connection_string"
    SECRET_KEY="your_jwt_secret_key"
    ```

5.  **Run the backend server:**
    ```bash
    fastapi dev main.py
    ```
    The backend API will now be running at `http://127.0.0.1:8000`.

### **Frontend Setup**

1.  **Navigate to the frontend directory:**
    ```bash
    # From the root directory
    cd frontend
    ```

2.  **Install the required npm packages:**
    ```bash
    npm install
    ```

3.  **Start the frontend development server:**
    ```bash
    npm start
    ```
    The React application will now be running and accessible at `http://localhost:3000` (or another port if 3000 is in use).

---

## 🔗 API Endpoints

The backend provides the following API endpoints:

-   `POST /sign_up`: Create a new user account.
-   `POST /login`: Authenticate a user and receive a JWT.
-   `POST /creating_notes`: Create a new note for the authenticated user.
-   `POST /getting_notes`: Fetch all notes for the authenticated user.
-   `POST /updatting_notes`:  Update an existing note.
-   `POST /deleting_notes`:  Delete an existing note.

---

## ☁️ Deployment

The backend of this application is ready to be deployed on platforms like **Render**.

-   **Build Command**: `pip install -r requirements.txt`
-   **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

Remember to set your environment variables (from your `.env` file) in the Render service's environment settings.

