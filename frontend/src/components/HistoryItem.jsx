const actionColors = {
  Created: 'bg-blue-100 text-blue-800',
  Updated: 'bg-purple-100 text-purple-800',
  Completed: 'bg-green-100 text-green-800',
  Deleted: 'bg-red-100 text-red-800',
};

export default function HistoryItem({ history }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-600 mb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800">
            {history.taskId?.title || 'Task'}
          </h4>
          {history.details && (
            <p className="text-sm text-gray-600 mt-1">{history.details}</p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            {formatDate(history.actionDate)}
          </p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded ${actionColors[history.action]}`}>
          {history.action}
        </span>
      </div>
      {history.taskId?.status && (
        <p className="text-xs text-gray-500 mt-2">
          Status: <span className="font-semibold">{history.taskId.status}</span>
        </p>
      )}
    </div>
  );
}
