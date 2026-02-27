import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-red-600">
          secondBrain Task Tracker
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
          
          {/* User info and logout */}
          <div className="flex items-center gap-3 border-l pl-6">
            <span className="text-gray-700 font-medium">
              {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
