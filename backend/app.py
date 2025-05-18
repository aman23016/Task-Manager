from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = 'tasks.json'

def load_tasks():
    if not os.path.exists(DATA_FILE):
        return {"tasks": {}}
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_tasks(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    data = load_tasks()
    return jsonify(list(data['tasks'].values()))

@app.route('/tasks', methods=['POST'])
def create_task():
    if not request.json or 'title' not in request.json:
        abort(400)
    
    tasks = load_tasks()
    data = request.get_json()
    if not data:
        abort(400, 'Invalid JSON')
    new_id = str(max(int(k) for k in tasks['tasks'].keys()) + 1) if data['tasks'] else '1'
    
    new_task = {
        'id': int(new_id),
        'title': data['title'],
        'description': data.get('description', ''),
        'status': data.get('status', 'To Do')
    }
    
    tasks['tasks'][new_id] = new_task
    save_tasks(tasks)
    return jsonify(new_task), 201

@app.route('/tasks/id=<int:task_id>', methods=['PUT'])
def update_task(task_id):
    tasks = load_tasks()
    data = request.get_json()
    task = tasks['tasks'].get(str(task_id))
    if not task:
        abort(404)
    
    updated_task = {
        'id': task_id,
        'title': data.get('title', task['title']),
        'description': data.get('description', task['description']),
        'status': data.get('status', task['status'])
    }
    
    tasks['tasks'][str(task_id)] = updated_task
    save_tasks(tasks)
    return jsonify(updated_task)

@app.route('/tasks/id=<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    tasks = load_tasks()
    if str(task_id) not in tasks['tasks']:
        abort(404)
    
    del tasks['tasks'][str(task_id)]
    save_tasks(tasks)
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)