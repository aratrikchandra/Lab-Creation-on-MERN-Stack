const query = { role: "admin" };
const result = await users.find(query, { projection: { _id: 0, user_id: 1, username: 1, email: 1 } }).toArray();
console.log(result);