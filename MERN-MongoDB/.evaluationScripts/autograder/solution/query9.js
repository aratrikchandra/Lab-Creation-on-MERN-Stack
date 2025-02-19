const result = db.Users.deleteMany(
  { email: { $regex: /hotmail\.com$/i } }
);
console.log(result);
