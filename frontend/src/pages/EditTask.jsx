import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { taskAPI } from '../services/api';

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await taskAPI.getTaskById(id);
        setTaskData({
          title: response.data.title,
          description: response.data.description,
          category: response.data.category,
          priority: response.data.priority,
          dueDate: response.data.dueDate ? new Date(response.data.dueDate).toISOString().split('T')[0] : '',
        });
      } catch (err) {
        setError('Failed to load task');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      setError(null);

      const updatedData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
      };

      await taskAPI.updateTask(id, updatedData);
      navigate('/tasks');
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <p className="text-center text-gray-600">Loading task...</p>
      </div>
    );
  }

  if (!taskData) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <p className="text-center text-red-600">Task not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Edit Task</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <TaskForm 
        initialData={taskData} 
        onSubmit={handleSubmit} 
        loading={submitting}
        submitButtonText="Update Task"
      />

      <button
        onClick={() => navigate('/tasks')}
        className="mt-4 text-gray-600 hover:text-gray-800 underline"
      >
        Cancel
      </button>
    </div>
  );
}
