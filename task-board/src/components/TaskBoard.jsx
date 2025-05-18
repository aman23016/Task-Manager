import { useState, useEffect } from 'react';
import StatusColumn from './StatusColumn';
import TaskModal from './TaskModal';
import CreateTaskModal from './CreateTaskModal';

const API_URL = 'https://task-manager-backend-one-lilac.vercel.app';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('To Do');
  const statuses = ['To Do', 'In Progress', 'Done'];

  // Fetch initial tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks`);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const tasks = await response.json();
        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  // Create new task with selected status
  const handleCreate = async (newTask) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTask, status: selectedStatus })
      });
      if (!response.ok) throw new Error('Failed to create task');
      const createdTask = await response.json();
      setTasks([...tasks, createdTask]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Update existing task
  const handleUpdate = async (updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/tasks/id=${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
      });
      if (!response.ok) throw new Error('Failed to update task');
      const savedTask = await response.json();
      setTasks(tasks.map(task => task.id === savedTask.id ? savedTask : task));
      setSelectedTask(null);
      setModalType(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete task
  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks/id=${selectedTask.id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete task');
      setTasks(tasks.filter(task => task.id !== selectedTask.id));
      setSelectedTask(null);
      setModalType(null);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle drag-and-drop status change
  const handleTaskDrop = async (taskId, newStatus) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === taskId);
      const updatedTask = { ...taskToUpdate, status: newStatus };
      
      const response = await fetch(`${API_URL}/tasks/id=${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
      });
      
      if (response.ok) {
        const savedTask = await response.json();
        setTasks(tasks.map(task => task.id === savedTask.id ? savedTask : task));
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Task Management Board
        </h1>
        <p className="text-gray-600">
          Manage your tasks efficiently with your very own drag-and-drop task board.
        </p>
      </header>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {statuses.map(status => (
            <StatusColumn
              key={status}
              status={status}
              tasks={tasks.filter(task => task.status === status)}
              onEdit={(task) => {
                setSelectedTask(task);
                setModalType('edit');
              }}
              onDelete={(task) => {
                setSelectedTask(task);
                setModalType('delete');
              }}
              onTaskDrop={(taskId) => handleTaskDrop(taskId, status)}
              onAddClick={() => {
                setSelectedStatus(status);
                setShowCreateModal(true);
              }}
            />
          ))}
        </div>

        {modalType && selectedTask && (
          <TaskModal
            type={modalType}
            task={selectedTask}
            onClose={() => {
              setSelectedTask(null);
              setModalType(null);
            }}
            onSave={handleUpdate}
            onConfirmDelete={handleDelete}
          />
        )}

        {showCreateModal && (
          <CreateTaskModal
            status={selectedStatus}
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreate}
          />
        )}
      </div>
    </div>
  );
};

export default TaskBoard;