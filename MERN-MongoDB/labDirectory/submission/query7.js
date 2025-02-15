const query = { category_name: "Personal" };
const update = { $set: { color_code: "#36454F" } };
const result = await categories.updateMany(query, update);
console.log(`${result.modifiedCount} categories updated.`);