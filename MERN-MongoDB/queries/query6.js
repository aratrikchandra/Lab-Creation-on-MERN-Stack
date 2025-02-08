const currentDate = new Date();
const sixtyDaysAgo = new Date(currentDate.getTime() - 60 * 24 * 60 * 60 * 1000);
const result = db.Todos.deleteMany({
    $or: [
        { status: "completed" },
        { created_at: { $lte: sixtyDaysAgo } }
    ]
});
console.log(result)