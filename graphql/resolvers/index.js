const usersResolvers = require("../models/users/resolvers");
const rolesResolvers = require("../models/roles/resolvers");
const categoriesResolvers = require("../models/categories/resolvers");
const ratingResolvers = require("../models/ratings/resolvers");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...rolesResolvers.Query,
    ...categoriesResolvers.Query,
    ...ratingResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...rolesResolvers.Mutation,
    ...categoriesResolvers.Mutation,
    ...ratingResolvers.Mutation,
  },
  User: { ...usersResolvers.User },
  UserProfile: { ...usersResolvers.UserProfile },
  AuthData: { ...usersResolvers.AuthData },
  Rating: { ...ratingResolvers.Rating },
};
