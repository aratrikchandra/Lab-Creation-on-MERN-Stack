const mongoose = require('mongoose');
const fs = require('fs');
const { faker } = require('@faker-js/faker');
const User = require('../models/User');
const Todo = require('../models/Todo');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/TaskMaster');

    // Get all user IDs
    const users = await User.find({}, '_id').lean();
    const userIds = users.map(u => u._id);

    const todos = [];
    for (let i = 0; i < 50; i++) {
        const created_at = faker.date.past({ days: 75 });
        const due_date = faker.date.future({ refDate: created_at, years: 0.25 });

        // Generate task content
        const taskType = faker.helpers.arrayElement(['Work', 'Personal', 'Learning', 'Official']);
        let title, description;
        switch (taskType) {
            case 'Work':
                title = `Complete ${faker.person.jobTitle().toLowerCase()} report`;
                description = `Submit to ${faker.person.fullName()}`;
                break;
            case 'Personal':
                title = `Buy ${faker.helpers.arrayElement(['groceries', 'clothes'])}`;
                description = `Purchase from ${faker.company.name()}`;
                break;
            case 'Learning':
                const skill = faker.helpers.arrayElement(['Python', 'React', 'Machine Learning']);
                title = `Learn ${skill}`;
                description = `Study via ${faker.helpers.arrayElement(['course', 'book'])}`;
                break;
            case 'Official':
                title = `Attend ${faker.helpers.arrayElement(['meeting', 'conference'])}`;
                description = `At ${faker.company.name()}`;
                break;
        }

        todos.push({
            user_id: faker.helpers.arrayElement(userIds),
            title,
            description,
            status: faker.helpers.arrayElement(['pending', 'in progress', 'completed']),
            priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
            created_at,
            due_date
        });
    }

    // Insert data into the database and retrieve inserted documents
    const insertedTodos = await Todo.insertMany(todos);
    console.log('Inserted 50 todos');

    // Fetch all documents from the todos collection
    const todos_full = await Todo.find({}).lean(); // Fetches plain JavaScript objects

    // Save the todos to a file named todos.json
    fs.writeFileSync('todos.json', JSON.stringify(todos_full, null, 2)); // Pretty-print with 2 spaces
    console.log('All todos have been saved to todos.json');

    await mongoose.disconnect();
}

main().catch(console.error);
