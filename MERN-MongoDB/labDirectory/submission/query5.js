const result = db.Users.updateOne({ user_id: 4 }, { $set: { username: "jhon", email: "jhon@yahoo.com", role: "admin" } });

console.log(result)