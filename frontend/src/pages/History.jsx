import { useEffect, useState } from 'react';
import HistoryItem from '../components/HistoryItem';
import { historyAPI } from '../services/api';

export default function History() {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterAction, setFilterAction] = useState('all');

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filterAction, history]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await historyAPI.getAllHistory();
      setHistory(response.data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    if (filterAction === 'all') {
      setFilteredHistory(history);
    } else {
      setFilteredHistory(history.filter(h => h.action === filterAction));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Task History</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <label className="block text-gray-700 font-semibold mb-2">Filter by Action</label>
        <select
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
        >
          <option value="all">All Actions</option>
          <option value="Created">Created</option>
          <option value="Updated">Updated</option>
          <option value="Completed">Completed</option>
          <option value="Deleted">Deleted</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : filteredHistory.length > 0 ? (
        <div className="max-w-3xl">
          {filteredHistory.map((item) => (
            <HistoryItem key={item._id} history={item} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600">No history records found</p>
        </div>
      )}
    </div>
  );
}
