db.Todos.find(
  { status: "pending" },
  { _id: 0, todo_id: 1, title: 1, due_date: 1, priority: 1 }
);