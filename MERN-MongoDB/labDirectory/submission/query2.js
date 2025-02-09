const currentDate = new Date('2025-05-20T00:00:00Z');
const thirtyDaysFromNow = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
const result = db.Todos.find({ priority: "medium", due_date: { $gte: currentDate, $lte: thirtyDaysFromNow } }, { todo_id: 1, user_id: 1, title: 1, due_date: 1, _id: 0 });

console.log(result)