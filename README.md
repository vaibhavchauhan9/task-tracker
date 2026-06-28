# 🗂️ Task Tracker — MERN Stack

A full-stack Task Management application built with the MERN stack, featuring JWT Authentication, protected routes, and a responsive dark UI.

**Live Demo:** [task-tracker-ruby-delta.vercel.app](https://task-tracker-ruby-delta.vercel.app)  
**Backend API:** [task-tracker-urfl.onrender.com](https://task-tracker-urfl.onrender.com/api/health)

---

## ✨ Features

- 🔐 **JWT Authentication** — Register & Login with bcrypt password hashing
- 👤 **User-wise Tasks** — Every user sees only their own tasks
- ✅ **Full CRUD** — Create, Read, Update, Delete tasks
- 🔍 **Filter & Sort** — Filter by status and priority
- 📊 **Stats Dashboard** — Live count of Total / To Do / In Progress / Done
- ⚠️ **Overdue Detection** — Tasks past due date are highlighted
- 📱 **Responsive UI** — Works on mobile and desktop
- 🌐 **Deployed** — Backend on Render, Frontend on Vercel

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React 18 + Vite | UI framework |
| React Router v6 | Client-side routing |
| Context API + useReducer | Global state management |
| Axios | HTTP client |
| CSS-in-JS (inline styles) | Styling |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database + ODM |
| JWT (jsonwebtoken) | Authentication tokens |
| bcryptjs | Password hashing |
| express-validator | Request validation |
| express-async-errors | Async error handling |

### DevOps
| Tool | Purpose |
|------|---------|
| MongoDB Atlas | Cloud database |
| Render | Backend hosting |
| Vercel | Frontend hosting |
| GitHub | Version control |

---

## 📁 Folder Structure

```
task-tracker/
│
├── server/                      # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Register, Login, Me
│   │   └── taskController.js    # CRUD + Stats
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT protect middleware
│   │   ├── errorHandler.js      # Global error handler
│   │   └── validateTask.js      # express-validator rules
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Task.js              # Task schema
│   ├── routes/
│   │   ├── authRoutes.js        # /api/auth/*
│   │   └── taskRoutes.js        # /api/tasks/*
│   ├── utils/
│   │   └── generateToken.js     # JWT token generator
│   ├── .env                     # Environment variables
│   └── server.js                # Entry point
│
└── client/                      # React + Vite Frontend
    ├── src/
    │   ├── api/
    │   │   └── taskApi.js       # Axios instance + interceptors
    │   ├── context/
    │   │   ├── AuthContext.jsx  # Auth state + login/logout
    │   │   └── TaskContext.jsx  # Task state + CRUD actions
    │   ├── components/
    │   │   ├── TaskCard.jsx     # Individual task card
    │   │   ├── TaskForm.jsx     # Add/Edit modal form
    │   │   └── TaskFilter.jsx   # Status/Priority filters
    │   ├── pages/
    │   │   ├── Dashboard.jsx    # Main task board
    │   │   ├── LoginPage.jsx    # Login form
    │   │   └── RegisterPage.jsx # Register form
    │   ├── App.jsx              # Auth gate + routing
    │   └── main.jsx             # React root
    └── .env                     # VITE_API_URL
```

---

## 🌐 API Endpoints

### Auth Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Task Routes (All Protected)
| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/tasks` | Get all tasks | `status`, `priority`, `sortBy`, `order`, `page`, `limit` |
| GET | `/api/tasks/stats` | Get task statistics | — |
| GET | `/api/tasks/:id` | Get single task | — |
| POST | `/api/tasks` | Create task | — |
| PUT | `/api/tasks/:id` | Update task | — |
| DELETE | `/api/tasks/:id` | Delete task | — |

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free)
- Git

### 1. Clone the repo
```bash
git clone https://github.com/vaibhavch/task-tracker.git
cd task-tracker
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/tasktracker
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

### 4. Open App
```
http://localhost:5173
```

---

## 🚀 Deployment

### Backend → Render
1. Push code to GitHub
2. Create new Web Service on Render
3. Set Root Directory: `server`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add Environment Variables (same as `.env`)

### Frontend → Vercel
1. Import GitHub repo on Vercel
2. Set Root Directory: `client`
3. Framework: Vite
4. Add Environment Variable:
   - `VITE_API_URL` = your Render URL + `/api`

---

## 🗄️ Database Schema

### User
```js
{
  name:      String,   // required
  email:     String,   // unique, required
  password:  String,   // hashed with bcrypt
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```js
{
  title:       String,   // required, 3-100 chars
  description: String,   // optional
  status:      String,   // 'todo' | 'in-progress' | 'done'
  priority:    String,   // 'low' | 'medium' | 'high'
  dueDate:     Date,     // optional
  user:        ObjectId, // ref to User
  createdAt:   Date,
  updatedAt:   Date
}
```

---

## 🔐 Authentication Flow

```
1. User registers → password hashed with bcrypt → saved to DB
2. User logs in → password compared → JWT token generated (7 days)
3. Token stored in localStorage
4. Every API request → token sent in Authorization: Bearer <token> header
5. Backend verifies token → attaches user to req.user
6. Tasks filtered by req.user._id → users see only their tasks
7. Logout → token removed from localStorage
```

---

## 👨‍💻 Developer

**Vaibhav kumar Chauhan**  
BCA | MDCA @ Gravity Institute  
NASSCOM Certified — Java Full Stack  
IBM SkillsBuild Certified — AI/ML  

[![GitHub](https://img.shields.io/badge/GitHub-vaibhavch-181717?style=flat&logo=github)](https://github.com/vaibhavch)

---

## 📄 License

MIT License — feel free to use this project for learning and interviews.
