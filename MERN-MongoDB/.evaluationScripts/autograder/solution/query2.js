const currentDate = new Date();
const next30Days = new Date();
next30Days.setDate(currentDate.getDate() + 30);

const result = db.Todos.find(
  { 
    priority: "medium",
    due_date: { $gte: currentDate, $lte: next30Days }
  },
  { _id: 0, todo_id: 1, user_id: 1, title: 1, due_date: 1 }
).toArray();
console.log(result);
