const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./models/User');
const Todo = require('./models/Todo');
const Category = require('./models/Category');

// Read data files
const users = JSON.parse(fs.readFileSync('./Data/users.json', 'utf8'));
const todos = JSON.parse(fs.readFileSync('./Data/todos.json', 'utf8'));
const categories = JSON.parse(fs.readFileSync('./Data/categories.json', 'utf8'));

async function loadData() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/TaskMaster');

    // Clear existing data
    await User.deleteMany();
    await Todo.deleteMany();
    await Category.deleteMany();

    // Insert new data
    await User.insertMany(users);
    await Todo.insertMany(todos);
    await Category.insertMany(categories);

    console.log('Database populated successfully using Mongoose!');
  } catch (err) {
    console.error('Error populating database:', err);
  } finally {
    await mongoose.disconnect();
  }
}

loadData();