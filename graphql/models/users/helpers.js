const User = require("../../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.register = async (email, password) => {
  email = email.toLowerCase();
  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error("User already exists");
  }
  password = await bcrypt.hash(password, 12);
  const user = await new User({
    email,
    password,
  });
  await user.save();
  const token = generateAccessToken(user, "1hr");
  return {
    id: user.id,
    token,
    ...user._doc,
  };
};
exports.login = async (email, password) => {
  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid Credentials");
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid Credentials");
  const token = generateAccessToken(user, "1hr");
  return {
    id: user.id,
    ...user._doc,
    token,
  };
};

exports.getUserByToken = (token) => {
  const user = jwt.verify(token, process.env.JWT_AUTH_KEY);
  return user;
};

/**
 * @param {object} user
 * @param {string} expiresIn
 * @returns {string}
 * @description Takes a user and assigns them a token
 */
const generateAccessToken = (user, expiresIn) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_AUTH_KEY,
    { expiresIn }
  );
  return token;
};
