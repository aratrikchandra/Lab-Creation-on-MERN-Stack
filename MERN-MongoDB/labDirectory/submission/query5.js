const currentDate = new Date();
const next7Days = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

const query = { status: "pending", due_date: { $gte: currentDate, $lte: next7Days } };
const update = { $set: { priority: "high" } };
const result = await todos.updateMany(query, update);
console.log(`${result.modifiedCount} todos updated.`);