const mongoose = require('mongoose');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust path as needed

async function main() {
    await mongoose.connect('mongodb://localhost:27017/TaskMaster');

    const numUsers = 20;
    const numAdmins = Math.floor(Math.random() * 4) + 3; // 3-6 admins

    const users = [];
    const domains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com']; // Possible email domains

    for (let i = 1; i <= numUsers; i++) {
        const username = `user${i}`;
        const domain = domains[Math.floor(Math.random() * domains.length)]; // Randomly select a domain
        const email = `${username}@${domain}`;

        // Hash the password before adding it to the user object
        const password = await bcrypt.hash(username, 10); // Password is the same as the username

        users.push({
            username,
            email,
            password,
            role: 'user'
        });
    }

    // Randomly assign admin roles
    const adminIndices = new Set();
    while (adminIndices.size < numAdmins) {
        adminIndices.add(Math.floor(Math.random() * numUsers));
    }
    adminIndices.forEach(idx => users[idx].role = 'admin');

    // Insert data into the database and fetch inserted documents
    const insertedUsers = await User.insertMany(users);
    console.log(`Inserted ${numUsers} users with ${numAdmins} admins`);

    // Fetch all documents from the categories collection
    const users_full = await User.find({}).lean(); // Fetches plain JavaScript objects

    // Save the todos to a file named users.json
    fs.writeFileSync('users.json', JSON.stringify(users_full, null, 2)); // Pretty-print with 2 spaces
    console.log('All users have been saved to users.json');

    await mongoose.disconnect();
}

main().catch(console.error);
