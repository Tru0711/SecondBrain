import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardStats from '../components/DashboardStats';
import TaskCard from '../components/TaskCard';
import { taskAPI } from '../services/api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAllTasks();
      setTasks(response.data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    high: tasks.filter(t => t.priority === 'High').length,
  };

  const recentTasks = tasks.slice(0, 3);

  const handleDelete = async (id) => {
    try {
      await taskAPI.deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleComplete = async (id) => {
    try {
      await taskAPI.completeTask(id);
      fetchTasks();
    } catch (err) {
      setError('Failed to complete task');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to secondBrain Task Tracker</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {!loading && <DashboardStats stats={stats} />}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Recent Tasks</h2>
          <Link 
            to="/add"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Add New Task
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : recentTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onComplete={handleComplete}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">No tasks yet</p>
            <Link 
              to="/add"
              className="text-red-600 hover:text-red-700 font-semibold"
            >
              Create your first task
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Completion Rate</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(0) : 0}%
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Pending Tasks</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Urgent Tasks</p>
          <p className="text-2xl font-bold text-red-600 mt-2">{stats.high}</p>
        </div>
      </div>
    </div>
  );
}
