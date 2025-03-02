const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
const result = db.Todos.updateMany({
    $and: [
        { status: "pending" },
        { due_date: { $gte: new Date(), $lte: sevenDaysFromNow } }
    ]
}, {
    $set: { priority: "high" }
});
console.log(result);