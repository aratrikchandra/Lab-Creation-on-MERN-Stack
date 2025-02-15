const query = { user_id: 4 };
const update = { $set: { username: "jhon", email: "jhon@yahoo.com", role: "admin" } };
const result = await users.updateOne(query, update);
console.log(`${result.modifiedCount} user updated.`);