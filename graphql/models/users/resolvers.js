const User = require("../../../models/User");
const Resource = require("../../../models/Resource");
const Like = require("../../../models/Like");
const { register, login, getUserByToken } = require("./helpers");

module.exports = {
  Query: {
    users: async (parent, _, { req }) => {
      return await User.find({});
    },
    usersLike: async (parent, { name }) => {
      return await User.find({ name: new RegExp(name, "i") });
    },
    userByEmail: async (parent, { email }) => {
      return await User.findOne({ email: email });
    },
    userByToken: async (_, { token }) => {
      return getUserByToken(token);
    },
    usersByFindString: async (parent, { findString }) => {
      return await User.find(eval("f=" + findString));
    },
    login: async (_, { email, password }) => {
      return login(email, password);
    },
  },
  Mutation: {
    createUser: async (_, { email, password }, context) => {
      return register(email, password);
    },
  },
  User: {
    resources: async (parent) => {
      const likedResources = await Like.find({ user: parent.id }, "resource");
      const resourceIDS = likedResources.map((r) => r.resource);
      return await Resource.find({ _id: { $in: resourceIDS } });
    },
  },
  AuthData: {
    user: (parent) => {
      return parent;
    },
  },
};
