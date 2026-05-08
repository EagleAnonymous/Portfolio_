// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://devrry.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Base Entrypoint
app.get('/', (req, res) => {
  res.send('Backend Server Entrypoint is Active');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello from the Node.js backend!" });
});

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Centralized Error Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 

// Handle graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server process terminated');
  });
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please kill the process or use a different port.`);
  }
});