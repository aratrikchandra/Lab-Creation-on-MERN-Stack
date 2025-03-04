db.Categories.aggregate([
  { $match: { category_name: "Work" } },
  {
      $lookup: {
          from: "Todos",
          localField: "todo_id",
          foreignField: "todo_id",
          as: "todo"
      }
  },
  { $unwind: "$todo" },
  {
      $project: {
          _id: 0,
          todo_id: "$todo.todo_id",
          title: "$todo.title",
          category_id: 1
      }
  }
]);