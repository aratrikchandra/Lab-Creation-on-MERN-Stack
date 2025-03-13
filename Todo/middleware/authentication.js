const CustomError = require('../errors');

const authenticateUser = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload)
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name , role: payload.role}
    console.log(req.user)
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

// const authorizePermissions = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       throw new CustomError.UnauthorizedError(
//         'Unauthorized to access this route'
//       );
//     }
//     next();
//   };
// };

module.exports = authenticateUser;