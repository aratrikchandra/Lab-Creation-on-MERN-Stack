const fs = require('fs');

// Read and parse data files
const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
const rawTodos = JSON.parse(fs.readFileSync('todos.json', 'utf8'));
const categories = JSON.parse(fs.readFileSync('categories.json', 'utf8'));

// Clear existing collections
db.Users.deleteMany({});
db.Todos.deleteMany({});
db.Categories.deleteMany({});

// Insert users (no date conversion needed)
db.Users.insertMany(users);

// Process todos: Convert ISO strings to Date objects
const processedTodos = rawTodos.map(todo => ({
    ...todo,
    due_date: new Date(todo.due_date),
    created_at: new Date(todo.created_at)
}));
db.Todos.insertMany(processedTodos);

// Insert categories (no date fields)
db.Categories.insertMany(categories);

print("Database populated successfully !!!");