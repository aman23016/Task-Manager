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

## AI Usage

- Deepseek was used for building this application
- Follow the links mentioned in the files added.