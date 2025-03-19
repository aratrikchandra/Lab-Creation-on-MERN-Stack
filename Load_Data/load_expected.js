const mongoose = require('mongoose');
const fs = require('fs');
const Todo = require('./models/Todo'); // Adjust the path as needed
const Category = require('./models/Category');
async function fetchAndStoreTodos() {
    try {
        // Connect to the MongoDB database
        await mongoose.connect('mongodb://localhost:27017/TaskMaster');

        // Fetch all documents from the todos collection
        const todos = await Todo.find({}).lean(); // Fetches plain JavaScript objects

        // Save the todos to a file named expected_todos.json
        fs.writeFileSync('./Data/expected_todos.json', JSON.stringify(todos, null, 2)); // Pretty-print with 2 spaces
        console.log('All todos have been saved to expected_todos.json');

        // Fetch all documents from the categories collection
        const categories = await Category.find({}).lean(); // Fetches plain JavaScript objects

        // Save the todos to a file named expected_todos.json
        fs.writeFileSync('./Data/expected_categories.json', JSON.stringify(categories, null, 2)); // Pretty-print with 2 spaces
        console.log('All categories have been saved to expected_categories.json');
        // Disconnect from the database
        await mongoose.disconnect();
    } catch (err) {
        console.error('Error fetching or saving todos:', err);
    }
}

// Execute the function
fetchAndStoreTodos();
