const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  return res.status(200).json({ message: "Signup endpoint hit successfully. Add your code here!" });
};

const login = async (req, res) => {
  return res.status(200).json({ message: "Login endpoint hit successfully. Add your code here!" });
};

module.exports = {
  signup,
  login
};
