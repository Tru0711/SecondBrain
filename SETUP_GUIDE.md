# secondBrain Task Tracker - Setup & Startup Guide

## Project Structure

```
e:\SecondBrain/
├── backend/                 # Node.js + Express + MongoDB backend
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/
│   │   ├── taskController.js
│   │   └── historyController.js
│   ├── models/
│   │   ├── Task.js
│   │   └── History.js
│   ├── routes/
│   │   ├── taskRoutes.js
│   │   └── historyRoutes.js
│   ├── middleware/
│   │   └── errorMiddleware.js
│   ├── server.js
│   ├── package.json
│   ├── .env                # Environment variables
│   └── node_modules/
│
└── frontend/               # React + Vite + Tailwind CSS frontend
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Page components
    │   ├── services/       # API client
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── package.json
    └── node_modules/
```

## Prerequisites

- **Node.js** v16+ (or latest LTS)
- **npm** v8+ or **yarn**
- **MongoDB Atlas** account
- Modern web browser (Chrome, Firefox, Edge)

## Setup Instructions

### 1. MongoDB Atlas Configuration

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user (store username & password)
4. Get your connection string

### 2. Backend Setup

1. Navigate to backend folder:
   ```powershell
   cd e:\SecondBrain\backend
   ```

2. Update `.env` file with your MongoDB credentials:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   NODE_ENV=development
   ```

3. Dependencies are already installed. Verify:
   ```powershell
   npm list
   ```

### 3. Frontend Setup

1. Navigate to frontend folder:
   ```powershell
   cd e:\SecondBrain\frontend
   ```

2. Dependencies are already installed. Verify:
   ```powershell
   npm list
   ```

## Running the Application

### Option 1: Run Both Servers (Recommended)

**Using the startup script:**
- Double-click `start-app.bat` file in the SecondBrain root folder
- This will open two terminal windows automatically

**Manual startup (PowerShell):**

Terminal 1 - Backend:
```powershell
cd e:\SecondBrain\backend
npm run dev
```

Terminal 2 - Frontend:
```powershell
cd e:\SecondBrain\frontend
npm run dev
```

### Option 2: Run Individually

**Backend only:**
```powershell
cd e:\SecondBrain\backend
npm run dev
# Server runs on http://localhost:5000
# API endpoints available at http://localhost:5000/api
```

**Frontend only:**
```powershell
cd e:\SecondBrain\frontend
npm run dev
# App runs on http://localhost:3000
# Note: Backend must be running for API calls to work
```

## Access Points

Once both servers are running:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## Application Routes

### Frontend Pages
- `/` - Dashboard (stats & recent tasks)
- `/tasks` - All tasks with filters
- `/add` - Create new task
- `/history` - Task history logs

### Backend API Endpoints

**Tasks:**
- `POST /api/tasks` - Create task
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Soft delete task

**History:**
- `GET /api/history` - Get all history
- `GET /api/history/:taskId` - Get task history

**Health:**
- `GET /api/health` - Server health check

## Available Scripts

### Backend
- `npm run dev` - Start backend with nodemon (development)
- `npm start` - Start backend (production)

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features Implemented

✅ **Backend:**
- Express server with CORS support
- MongoDB connection with Mongoose
- MVC folder structure
- Task CRUD operations
- Automatic history tracking
- Proper error handling
- Environment variable management

✅ **Frontend:**
- React with functional components
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Responsive design
- Task filtering (status, priority, category)
- Dashboard with statistics
- History tracking display

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB URI in `.env`
- Check network access in MongoDB Atlas IP whitelist
- Ensure database user has correct permissions

### Port Already in Use
- Backend: Change `PORT` in `.env` if 5000 is taken
- Frontend: Vite will auto-increment port if 3000 is taken

### Dependencies Issues
- Clear node_modules and reinstall:
  ```powershell
  rm -r node_modules
  npm install
  ```

### Frontend Can't Connect to Backend
- Verify backend is running on port 5000
- Check vite.config.js proxy settings
- Clear browser cache and reload

## Development Tips

1. **Use React Developer Tools** browser extension for component debugging
2. **Backend Logs**: Check terminal output for error details
3. **Nodemon**: Backend auto-restarts on file changes
4. **Vite**: Frontend auto-refreshes on file changes
5. **API Debugging**: Use curl or Postman to test endpoints directly

## Production Deployment

### Backend
```powershell
npm start
```

### Frontend
```powershell
npm run build
# Deploy dist/ folder to hosting (Vercel, Netlify, etc.)
```

## Support & Documentation

- Express: https://expressjs.com/
- Mongoose: https://mongoosejs.com/
- React: https://react.dev/
- Vite: https://vitejs.dev/
- Tailwind CSS: https://tailwindcss.com/
