// Read data from JSON files
const users = JSON.parse(cat("users.json"));
const todos = JSON.parse(cat("todos.json"));
const categories = JSON.parse(cat("categories.json"));

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
