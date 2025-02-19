const result = db.Categories.aggregate([
    { $match: { category_name: "Work" } },
    {
      $lookup: {
        from: "Todos",
        localField: "todo_id",
        foreignField: "todo_id",
        as: "todoInfo"
      }
    },
    { $unwind: "$todoInfo" },
    { 
      $project: { 
        _id: 0, 
        todo_id: "$todoInfo.todo_id", 
        title: "$todoInfo.title", 
        category_id: "$category_id" 
      } 
    }
  ]).toArray();
  console.log(result);
  