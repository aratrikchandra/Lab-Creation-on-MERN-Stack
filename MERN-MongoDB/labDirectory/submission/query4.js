// query4.js

const query4 = db.Todos.aggregate([
  // Join with Categories collection
  { 
    $lookup: {
      from: "Categories",           // Collection to join
      localField: "todo_id",        // Field from the Todos collection
      foreignField: "todo_id",      // Field from the Categories collection
      as: "categories"              // Name for the array field added to each document
    }
  },
  // Unwind the categories array to de-normalize the data
  { $unwind: "$categories" },
  // Match documents where the category name is "Work"
  { $match: { "categories.category_name": "Work" } },
  // Project the required fields
  { 
    $project: { 
      todo_id: 1, 
      title: 1, 
      category_id: "$categories.category_id",
      category_name: "$categories.category_name" 
    } 
  }
]).toArray();
console.log(query4);
