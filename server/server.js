require('express-async-errors');
require('dotenv').config();

const express      = require('express');
const cors         = require('cors');
const connectDB    = require('./config/db');
const taskRoutes   = require('./routes/taskRoutes');
const authRoutes   = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

connectDB();

const app = express();

// ✅ Sab origins allow - debug ke liye
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    clientUrl: process.env.CLIENT_URL,
    nodeEnv: process.env.NODE_ENV,
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
