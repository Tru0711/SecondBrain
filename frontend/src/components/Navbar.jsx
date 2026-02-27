import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-red-600">
          BSE Task Tracker
        </Link>
        <div className="flex gap-6 items-center">
          <Link 
            to="/" 
            className="text-gray-800 hover:text-red-600 font-medium transition"
          >
            Dashboard
          </Link>
          <Link 
            to="/tasks" 
            className="text-gray-800 hover:text-red-600 font-medium transition"
          >
            Tasks
          </Link>
          <Link 
            to="/add" 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Add Task
          </Link>
          <Link 
            to="/history" 
            className="text-gray-800 hover:text-red-600 font-medium transition"
          >
            History
          </Link>
        </div>
      </div>
    </nav>
  );
}
