const currentDate = new Date('2025-05-20T00:00:00Z');
const sevenDaysFromNow = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
const result = db.Todos.updateMany({ status: "pending", due_date: { $gte: currentDate, $lte: sevenDaysFromNow } }, { $set: { priority: "high" } });

console.log(result)