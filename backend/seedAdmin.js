const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust path to your User model

require('dotenv').config(); // Load environment variables

// Connect to MongoDB
const connectionString = 'mongodb+srv://Cluster93869:efbd16cqmLwVBsVR@cluster93869.0cvyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster93869';
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.error('MongoDB connection error:', err));

// Seed admin user
async function seedAdminUser() {
  try {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      mongoose.connection.close();
      return;
    }

    const adminUser = new User({
      username: 'admin',
      email: 'quangvu@primemedteam.com',
      password: '$rSen2l2324',
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating admin user:', error);
    mongoose.connection.close();
  }
}

seedAdminUser();
