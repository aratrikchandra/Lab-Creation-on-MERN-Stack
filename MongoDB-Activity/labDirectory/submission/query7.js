const result = db.Categories.updateMany(
  { category_name: "Personal" },
  { $set: { color_code: "#36454F" } }
);
console.log(result);
