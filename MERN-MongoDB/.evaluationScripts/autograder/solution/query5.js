const currentDate = new Date();
const next7Days = new Date();
next7Days.setDate(currentDate.getDate() + 7);

const result = db.Todos.updateMany(
  { 
    status: "pending", 
    due_date: { $gte: currentDate, $lte: next7Days }
  },
  { $set: { priority: "high" } }
);
console.log(result);
