const currentDate = new Date();
const thresholdDate = new Date();
thresholdDate.setDate(currentDate.getDate() - 60);

const result = db.Todos.deleteMany(
  { 
    $or: [
      { status: "completed" },
      { created_at: { $lt: thresholdDate } }
    ]
  }
);
console.log(result);
