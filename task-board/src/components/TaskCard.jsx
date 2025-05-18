import { useEffect, useRef } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const ref = useRef(null);
  const statusColors = {
    'To Do': 'border-red-500',
    'In Progress': 'border-amber-300',
    'Done': 'border-green-500'
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return draggable({
      element,
      getInitialData: () => ({
        type: 'task',
        id: task.id,
        status: task.status
      }),
    });
  }, [task.id, task.status]);

  return (
    <div
      ref={ref}
      className={`bg-white p-4 rounded-lg border-l-4 ${statusColors[task.status]}
        shadow-xs hover:shadow-md transition-all duration-200 group relative
        pr-10 cursor-grab active:cursor-grabbing`}
      tabIndex="0"
      aria-label={`Task: ${task.title}`}
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100
        transition-opacity flex gap-1.5">
        <button
          onClick={() => onEdit(task)}
          className="p-1 hover:bg-gray-100 rounded-md text-blue-500
            focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={`Edit task: ${task.title}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(task)}
          className="p-1 hover:bg-gray-100 rounded-md text-red-500
            focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label={`Delete task: ${task.title}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 text-sm">{task.title}</h3>
      {task.description && (
        <p className="text-gray-600 text-xs line-clamp-3">{task.description}</p>
      )}
      <div className="mt-3 text-xs text-gray-400">
        Status: {task.status}
      </div>
    </div>
  );
};

export default TaskCard;