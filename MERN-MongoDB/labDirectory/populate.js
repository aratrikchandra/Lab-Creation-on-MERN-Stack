const fs = require('fs');

// Read data from JSON files
const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
const todos = JSON.parse(fs.readFileSync('todos.json', 'utf8'));
const categories = JSON.parse(fs.readFileSync('categories.json', 'utf8'));

// Remove all data from the collections
db.Users.deleteMany({});
db.Todos.deleteMany({});
db.Categories.deleteMany({});

// Populate the Users collection with data from users.json
db.Users.insertMany(users);

// Populate the Todos collection with data from todos.json
db.Todos.insertMany(todos);

// Populate the Categories collection with data from categories.json
db.Categories.insertMany(categories);

print("Data populated successfully!");
