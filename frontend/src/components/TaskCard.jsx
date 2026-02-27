import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800',
};

const statusColors = {
  Pending: 'text-gray-600',
  Completed: 'text-green-600 line-through',
};

export default function TaskCard({ task, onDelete, onComplete, onEdit }) {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);

  const handleComplete = () => {
    if (task.status !== 'Completed') {
      onComplete(task._id);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id);
    }
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : '';
  };

  return (
    <div 
      className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition border-l-4 border-red-600"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${statusColors[task.status]}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <div className="flex gap-2 mt-3 mb-3 flex-wrap text-sm">
        <span className="px-2 py-1 bg-gray-200 rounded text-gray-700">
          {task.category}
        </span>
        <span className={`px-2 py-1 rounded text-white ${
          task.status === 'Completed' ? 'bg-green-500' : 'bg-gray-400'
        }`}>
          {task.status}
        </span>
      </div>

      {task.dueDate && (
        <p className="text-xs text-gray-500 mb-3">
          Due: {formatDate(task.dueDate)}
        </p>
      )}

      {task.completedAt && (
        <p className="text-xs text-green-600 mb-3">
          Completed: {formatDate(task.completedAt)}
        </p>
      )}

      <div className={`flex gap-2 transition-opacity ${showActions ? 'opacity-100' : 'opacity-0'}`}>
        {task.status !== 'Completed' && (
          <button
            onClick={handleComplete}
            className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
          >
            Complete
          </button>
        )}
        <button
          onClick={() => navigate(`/tasks/${task._id}`)}
          className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
