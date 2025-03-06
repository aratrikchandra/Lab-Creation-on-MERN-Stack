const query8 = db.Todos.deleteMany({
  $or: [
      { status: "completed" },
      { created_at: { $lte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }}
  ]
});
console.log(query8);
