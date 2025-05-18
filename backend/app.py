from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

tasks = {
    "1": {
      "id": 1,
      "title": "Design wireframes",
      "description": "Create basic wireframes for the app UI",
      "status": "To Do"
    },
    "2": {
      "id": 2,
      "title": "Setup project",
      "description": "Initialize React app with Vite and Tailwind CSS",
      "status": "In Progress"
    },
    "3": {
      "id": 3,
      "title": "Implement task cards",
      "description": "Display task cards in columns",
      "status": "Done"
    },
    "4": {
      "id": 4,
      "title": "Add drag-and-drop",
      "description": "Integrate react-beautiful-dnd for drag-and-drop",
      "status": "To Do"
    },
    "5": {
      "id": 5,
      "title": "Write backend API",
      "description": "Create Python backend to handle tasks and database.",
      "status": "In Progress"
    },
    "6": {
      "id": 6,
      "title": "Deploy application",
      "description": "Deploy app to a server or cloud platform",
      "status": "Done"
    }
}

# def load_tasks():
#     if not os.path.exists(DATA_FILE):
#         return {"tasks": {}}
#     with open(DATA_FILE, 'r') as f:
#         return json.load(f)

# def save_tasks(data):
#     with open(DATA_FILE, 'w') as f:
#         json.dump(data, f, indent=2)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(list(tasks.values()))

@app.route('/tasks', methods=['POST'])
def create_task():
    if not request.json or 'title' not in request.json:
        abort(400)
    
    data = request.get_json()
    if not data:
        abort(400, 'Invalid JSON')
    new_id = str(max(int(k) for k in tasks.keys()) + 1) if tasks else '1'
    
    new_task = {
        'id': int(new_id),
        'title': data['title'],
        'description': data.get('description', ''),
        'status': data.get('status', 'To Do')
    }
    
    tasks[new_id] = new_task
    return jsonify(new_task), 201

@app.route('/tasks/id=<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    task = tasks[str(task_id)]
    if not task:
        abort(404)
    
    updated_task = {
        'id': task_id,
        'title': data.get('title', task['title']),
        'description': data.get('description', task['description']),
        'status': data.get('status', task['status'])
    }
    
    tasks[str(task_id)] = updated_task
    return jsonify(updated_task)

@app.route('/tasks/id=<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    if str(task_id) not in tasks:
        abort(404)
    
    del tasks[str(task_id)]
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)