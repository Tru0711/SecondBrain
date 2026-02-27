import { useState } from 'react';

export default function TaskForm({ initialData, onSubmit, loading }) {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      description: '',
      category: 'Personal',
      priority: 'Medium',
      dueDate: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
      <div className="mb-4">
        <label className="block text-gray-800 font-semibold mb-2">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 font-semibold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
          >
            <option value="Personal">Personal</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 font-semibold mb-2">
          Due Date
        </label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Task'}
      </button>
    </form>
  );
}
