# TaskFlow - Task Management System

A sleek, responsive, and modern task management application featuring a React/Vite frontend and an Express/Sequelize backend with an SQLite database. It supports full CRUD operations on tasks, status-based filtering, and a dark/light theme toggle.

---

## Setup Steps

Follow these steps to set up and run the application locally:

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "O2h project"
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. (Optional) Configure environment variables:
   A default `.env` file is provided with the following content:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=task_db
   ```
4. Start the backend server:
   - For development (with auto-reload via nodemon):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```
   The backend server will run on `http://localhost:5000` (or the configured `PORT`).

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173` (or the port displayed in the console).

---

## Assumptions

- **Database:** The backend utilizes **SQLite** as the database (configured in [db.js](file:///c:/Users/Bhargavi/Desktop/O2h%20project/backend/config/db.js)), reading/writing to `backend/database.sqlite`. The database file will be automatically initialized and synchronized if it does not exist.
- **Node.js Environment:** Assumes that Node.js (LTS version v18+ or v20+) and npm are installed on the local system.
- **API Connectivity:** The frontend is configured to communicate with the backend at `http://localhost:5000` by default (defined in [api.js](file:///c:/Users/Bhargavi/Desktop/O2h%20project/frontend/src/services/api.js) via `API_BASE_URL`). This can be overridden by setting the `VITE_API_URL` environment variable.
- **Ports:** Assumes port `5000` is free for the backend and port `5173` (or Vite's default fallback) is free for the frontend.

---

## API Documentation

The backend server exposes the following endpoints (Base URL: `http://localhost:5000`):

### Health Check
* **`GET /`**
  - **Description:** Checks if the Task Management API is running.
  - **Response:**
    - **Status:** `200 OK`
    - **Body:** `Task Management API is running...` (text/plain)

### Tasks Endpoints
* **`GET /tasks`**
  - **Description:** Retrieves all tasks, ordered by creation date descending.
  - **Response:**
    - **Status:** `200 OK`
    - **Body:** Array of task objects:
      ```json
      [
        {
          "id": 1,
          "title": "Build Landing Page",
          "description": "Design and implement the landing page with custom CSS styles.",
          "status": "In Progress",
          "created_at": "2026-06-20T17:18:29.000Z"
        }
      ]
      ```

* **`POST /tasks`**
  - **Description:** Creates a new task.
  - **Request Body:**
    - `title` (string, required): Title of the task.
    - `description` (string, required): Detailed task description (minimum 20 characters).
    - `status` (string, optional): Initial status. Must be `'Pending'`, `'In Progress'`, or `'Completed'` (defaults to `'Pending'`).
  - **Response:**
    - **Status:** `201 Created`
    - **Body:** The newly created task object.
    - **Status:** `400 Bad Request` if validation fails (e.g. description is shorter than 20 characters, title is empty, or status is invalid).

* **`PUT /tasks/:id`**
  - **Description:** Updates the status of an existing task.
  - **Request Body:**
    - `status` (string, required): The new status. Must be `'Pending'`, `'In Progress'`, or `'Completed'`.
  - **Response:**
    - **Status:** `200 OK`
    - **Body:** The updated task object.
    - **Status:** `400 Bad Request` if status is invalid.
    - **Status:** `404 Not Found` if no task matches the given `id`.

* **`DELETE /tasks/:id`**
  - **Description:** Deletes a task.
  - **Response:**
    - **Status:** `200 OK`
    - **Body:**
      ```json
      {
        "message": "Task deleted successfully"
      }
      ```
    - **Status:** `404 Not Found` if no task matches the given `id`.
