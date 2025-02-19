const result = db.Users.find(
    { role: "admin" },
    { _id: 0, user_id: 1, username: 1, email: 1 }
  ).toArray();
  console.log(result);
  