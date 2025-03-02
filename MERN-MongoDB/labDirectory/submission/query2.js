const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
const result = db.Todos.find({
    $and: [
        { priority: "medium" },
        { due_date: { $lte: thirtyDaysFromNow } },
        { due_date: { $gte: new Date() } }
    ]
}, {
    _id: 0,
    todo_id: 1,
    user_id: 1,
    title: 1,
    due_date: 1
}).toArray();
console.log(result);