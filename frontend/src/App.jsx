import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import History from './pages/History';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Private routes with Navbar */}
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <>
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/add" element={<AddTask />} />
                      <Route path="/tasks/:id" element={<EditTask />} />
                      <Route path="/history" element={<History />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
