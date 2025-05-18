import { useState, useEffect, useRef } from 'react';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import TaskCard from './TaskCard';

const StatusColumn = ({ status, tasks, onEdit, onDelete, onTaskDrop, onAddClick }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const ref = useRef(null);
  const statusColors = {
    'To Do': 'border-red-500',
    'In Progress': 'border-amber-300',
    'Done': 'border-green-500'
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return dropTargetForElements({
      element,
      getData: () => ({ status }),
      onDragEnter: () => setIsDraggingOver(true),
      onDragLeave: () => setIsDraggingOver(false),
      onDrop: ({ source }) => {
        setIsDraggingOver(false);
        const data = source.data;
        if (data.type === 'task' && data.status !== status) {
          onTaskDrop(data.id);
        }
      },
    });
  }, [status, onTaskDrop]);

  return (
    <div
      ref={ref}
      className={`flex-1 min-w-[300px] max-w-full lg:max-w-[400px] rounded-xl p-4
        transition-all duration-200 bg-white shadow-sm hover:shadow-md
        ${isDraggingOver ? 'ring-2 ring-purple-400 scale-[1.02]' : 'ring-1 ring-gray-200'}
        flex flex-col`}
      aria-label={`${status} column`}
    >
      <div className={`flex justify-between items-center mb-4 p-3 rounded-md border-l-4 pl-3 ${statusColors[status]}`}>
        <div className={`border-l-4 pl-3 ${statusColors[status]}`}>
          <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">
            {status} <span className="text-gray-400 font-normal">({tasks.length})</span>
          </h2>
        </div>
        <button
          onClick={onAddClick}
          className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 hover:text-blue-600 transition-colors"
          aria-label={`Add task to ${status}`}
        >
          <svg 
            className="w-5 h-5"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pb-2">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-gray-400 text-sm text-center py-4">
            No tasks in this column
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusColumn;