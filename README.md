# Task Management Board

A simple task management board where users can create, view, update, delete, and drag-and-drop tasks between different status columns: **To Do**, **In Progress**, and **Done**.

This project consists of a **React frontend** and a **Flask backend**, deployed on Vercel.

## Features

- **Task Creation:** Users can add new tasks by providing a title, description, and selecting a status column to place the task in.
  
- **Task Viewing:** Tasks are displayed in their respective columns, clearly showing their current status with the title and optional description visible.

- **Task Editing:** Users can modify the title and description of existing tasks inline to keep their task information up to date.

- **Task Deletion:** Tasks can be removed permanently with a confirmation prompt to avoid accidental deletion.

- **Drag-and-Drop:** Tasks can be easily moved between columns by dragging and dropping, allowing dynamic reorganization of task status.

- **Persistent Storage:** Tasks are stored in a JSON file on the backend to maintain state across server restarts and deployments.

## Technologies Used

- **Frontend:**
  - React.js
  - Vite (Build tool)
  - Tailwind CSS (for styling)
  - Pragmatic Drag-and-Drop (for drag-and-drop functionality)
  
- **Backend:**
  - Flask (Python web framework)
  - Flask-CORS (to handle cross-origin requests)

## Endpoints (Flask API)

- **GET /tasks**: Get all tasks
- **POST /tasks**: Create a new task
- **PUT /tasks/:id**: Update an existing task
- **DELETE /tasks/:id**: Delete a task

## Setup

### Frontend Setup

- Clone the frontend repo and navigate to its directory:
  ```bash
  git clone https://github.com/aman23016/Task-Manager.git
  cd task-board/
  ```

- Install the required libraries:
  ```bash
  npm install
  ```

- Install Pragmatic-drag-and-drop
  ```bash
  npm install @atlaskit/pragmatic-drag-and-drop @atlaskit/pragmatic-drag-and-drop-hitbox tiny-invariant
  ```

- Install tailwindcss v4.1
  ```bash
  npm install tailwindcss @tailwindcss/vite 
  ```

- Start the frontend server:
  ```bash
  npm run dev
  ```

### Backend Setup:

- After cloning the github, create and activate a Python environment:
  ```bash
  python -m venv venv
  source venv/bin/activate     # macOS/Linux
  venv\Scripts\activate        # Windows
  ```

- Install dependencies:
  ```bash
  pip install -r requirements.txt
  ```

- Run the flask server:
  ```bash
  python app.py             #Windows
  or
  python3 app.py            #macOS
  ```

## AI Usage

- Deepseek was used for building this application
- Follow the links mentioned in the files added.

## Deployment Link

- Application Deployed at: https://task-manager-frontend-peach-nine.vercel.app