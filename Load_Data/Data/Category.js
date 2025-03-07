const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Todo = require('../models/Todo');
const Category = require('../models/Category');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/TaskMaster');

    // Get all todo IDs
    const todos = await Todo.find({}, '_id').lean();
    const todoIds = todos.map(t => t._id);

    const categories = [];
    for (let i = 0; i < 100; i++) {
        categories.push({
            todo_id: faker.helpers.arrayElement(todoIds),
            category_name: faker.helpers.arrayElement(['Work', 'Personal', 'Learning', 'Official']),
            color_code: faker.color.rgb()
        });
    }

    await Category.insertMany(categories);
    console.log('Inserted 100 categories');

    await mongoose.disconnect();
}

main().catch(console.error);