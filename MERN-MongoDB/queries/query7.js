const result = db.Users.deleteMany({ email: /@hotmail\.com$/ });
console.log(result)