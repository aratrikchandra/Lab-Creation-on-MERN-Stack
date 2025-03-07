const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('../models/User'); // Adjust path as needed

async function main() {
    await mongoose.connect('mongodb://localhost:27017/TaskMaster');

    const numUsers = 20;
    const numAdmins = Math.floor(Math.random() * 4) + 3; // 3-6 admins

    const users = [];
    const usedUsernames = new Set();

    for (let i = 0; i < numUsers; i++) {
        let username;
        do {
            username = faker.internet.username().replace(/[^a-zA-Z0-9_]/g, '');
        } while (usedUsernames.has(username));
        usedUsernames.add(username);

        const domain = faker.helpers.arrayElement(['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com']);
        const email = `${username}@${domain}`;

        users.push({
            username,
            email,
            password_hash: faker.internet.password(),
            role: 'user'
        });
    }

    // Randomly assign admin role
    const adminIndices = new Set();
    while (adminIndices.size < numAdmins) {
        adminIndices.add(Math.floor(Math.random() * numUsers));
    }
    adminIndices.forEach(idx => users[idx].role = 'admin');

    await User.insertMany(users);
    console.log(`Inserted ${numUsers} users with ${numAdmins} admins`);

    await mongoose.disconnect();
}

main().catch(console.error);