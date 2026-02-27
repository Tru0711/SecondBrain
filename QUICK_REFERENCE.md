# BSE Smart Task Tracker - Quick Reference

## Quick Start (In PowerShell)

```powershell
# Terminal 1 - Start Backend
cd e:\SecondBrain\backend
npm run dev

# Terminal 2 - Start Frontend (in new PowerShell window)
cd e:\SecondBrain\frontend
npm run dev
```

Then open: **http://localhost:3000**

## Environment Variables

### Backend (.env file)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
NODE_ENV=development
```

Replace:
- `username` with your MongoDB Atlas username
- `password` with your MongoDB Atlas password
- `dbname` with your database name

## API Overview

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task (soft) |
| GET | `/api/history` | Get all history |
| GET | `/api/history/:taskId` | Get task history |
| GET | `/api/health` | Health check |

## Task Schema

```json
{
  "title": "string (required)",
  "description": "string",
  "category": "Business | Personal",
  "priority": "Low | Medium | High",
  "status": "Pending | Completed",
  "dueDate": "date",
  "completedAt": "date",
  "isDeleted": "boolean"
}
```

## Frontend Pages

| URL | Component | Purpose |
|-----|-----------|---------|
| `/` | Dashboard | Overview & stats |
| `/tasks` | Tasks | Browse all tasks |
| `/add` | AddTask | Create new task |
| `/history` | History | Activity logs |

## Component Structure

```
components/
├── Navbar.jsx         → Navigation bar
├── TaskCard.jsx       → Individual task display
├── TaskForm.jsx       → Task creation/edit form
├── DashboardStats.jsx → Statistics cards
└── HistoryItem.jsx    → History entry

pages/
├── Dashboard.jsx  → Home page
├── Tasks.jsx      → Tasks list
├── AddTask.jsx    → New task form
└── History.jsx    → History view
```

## Useful Commands

### Backend
```powershell
npm run dev      # Development mode (with nodemon)
npm start        # Production mode
npm list         # List installed packages
```

### Frontend
```powershell
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Files Changed After Setup

- `backend/.env` - Update with MongoDB credentials
- All source files in `backend/src` and `frontend/src` are ready to use

## Next Steps

1. ✅ Install dependencies (done)
2. ⏳ Update `backend/.env` with MongoDB credentials
3. ⏳ Run both servers
4. ⏳ Test the application
5. ⏳ Deploy to production

---

**Created:** February 27, 2026
**Project:** BSE Smart Task Tracker
**Stack:** Node.js + Express + MongoDB + React + Vite + Tailwind CSS
