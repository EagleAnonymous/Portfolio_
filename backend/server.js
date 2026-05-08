// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['https://devrry.vercel.app', 'http://localhost:3000'], 
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

// Contact Form Endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  console.log(`New Message from ${name} (${email}): ${message}`);
  
  // Here you would normally add logic to send an email or save to a database
  res.status(200).json({ message: "Message received successfully!" });
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