const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
connectionString = 'mongodb+srv://Cluster93869:efbd16cqmLwVBsVR@cluster93869.0cvyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster93869';
mongoose.connect(connectionString)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// // Routes
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});
app.use('/api/users', require('./routes/userRoutes')); // User routes
app.use('/api/questions', require('./routes/questionRoutes')); // Question routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
