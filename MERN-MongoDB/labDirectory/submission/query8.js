const currentDate = new Date();
const sixtyDaysAgo = new Date(currentDate.getTime() - 60 * 24 * 60 * 60 * 1000);

const query = { $or: [{ status: "completed" }, { created_at: { $lt: sixtyDaysAgo } }] };
const result = await todos.deleteMany(query);
console.log(`${result.deletedCount} todos deleted.`);