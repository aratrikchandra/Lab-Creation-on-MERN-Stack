// generateData.js
const fs = require("fs");
const { faker } = require("@faker-js/faker");

// Helper function to generate random dates
function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Generate 20 users
const users = [];
for (let i = 1; i <= 20; i++) {
    users.push({
        user_id: i,
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password_hash: faker.internet.password(),
        role: i === 1 ? "admin" : "user", // First user is admin
    });
}

// Generate 50 todos
const todos = [];
const currentDate = new Date();
for (let i = 1; i <= 50; i++) {
    const user_id = faker.datatype.number({ min: 1, max: 20 }); // Random user_id between 1 and 20
    const created_at = getRandomDate(new Date(currentDate.getTime() - 65 * 24 * 60 * 60 * 1000), new Date(currentDate.getTime())); // Within 65 days from current date
    const due_date = getRandomDate(new Date(created_at.getTime() + 1 * 24 * 60 * 60 * 1000), new Date(created_at.getTime() + 90 * 24 * 60 * 60 * 1000)); // Due date within 1 to 90 days of creation
    todos.push({
        todo_id: i,
        user_id,
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        status: faker.helpers.arrayElement(["pending", "in progress", "completed"]),
        due_date,
        priority: faker.helpers.arrayElement(["low", "medium", "high"]),
        created_at,
    });
}

// Generate 100 categories
const categories = [];
for (let i = 1; i <= 100; i++) {
    const todo_id = faker.datatype.number({ min: 1, max: 50 }); // Random todo_id between 1 and 50
    categories.push({
        category_id: i,
        todo_id,
        category_name: faker.helpers.arrayElement(["Work", "Personal", "Learning", "Official"]),
        color_code: faker.internet.color(),
    });
}

// Save data to files
fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));
fs.writeFileSync("categories.json", JSON.stringify(categories, null, 2));

console.log("Data generated and saved to users.json, todos.json, and categories.json");