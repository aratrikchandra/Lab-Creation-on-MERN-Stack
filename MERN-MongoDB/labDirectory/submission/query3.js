const result = db.Users.find({ role: "admin" }, { user_id: 1, username: 1, email: 1, _id: 0 });
console.log(result)