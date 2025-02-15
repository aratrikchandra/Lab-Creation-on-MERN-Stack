const workCategories = await categories.find({ category_name: "Work" }, { projection: { _id: 0, todo_id: 1 } }).toArray();
const todoIds = workCategories.map(cat => cat.todo_id);

const result = await todos.find({ todo_id: { $in: todoIds } }, { projection: { _id: 0, todo_id: 1, title: 1, category_id: 1 } }).toArray();
console.log(result);