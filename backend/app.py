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
    
    data = load_tasks()
    new_id = str(max(int(k) for k in data['tasks'].keys()) + 1) if data['tasks'] else '1'
    
    new_task = {
        'id': int(new_id),
        'title': request.json['title'],
        'description': request.json.get('description', ''),
        'status': request.json.get('status', 'To Do')
    }
    
    data['tasks'][new_id] = new_task
    save_tasks(data)
    return jsonify(new_task), 201

@app.route('/tasks/id=<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = load_tasks()
    task = data['tasks'].get(str(task_id))
    if not task:
        abort(404)
    
    updated_task = {
        'id': task_id,
        'title': request.json.get('title', task['title']),
        'description': request.json.get('description', task['description']),
        'status': request.json.get('status', task['status'])
    }
    
    data['tasks'][str(task_id)] = updated_task
    save_tasks(data)
    return jsonify(updated_task)

@app.route('/tasks/id=<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    data = load_tasks()
    if str(task_id) not in data['tasks']:
        abort(404)
    
    del data['tasks'][str(task_id)]
    save_tasks(data)
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)