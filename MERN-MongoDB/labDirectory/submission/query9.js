const query = { email: { $regex: /hotmail\.com$/i } };
const result = await users.deleteMany(query);
console.log(`${result.deletedCount} users deleted.`);