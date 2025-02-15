const currentDate = new Date();
const next30Days = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);

const query = { priority: "medium", due_date: { $gte: currentDate, $lte: next30Days } };
const result = await todos.find(query, { projection: { _id: 0, todo_id: 1, user_id: 1, title: 1, due_date: 1 } }).toArray();
console.log(result);