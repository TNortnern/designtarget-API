const usersResolvers = require("../models/users/resolvers");
const resourcesResolvers = require("../models/resources/resolvers");
const categoriesResolvers = require("../models/categories/resolvers");
const likesResolvers = require("../models/likes/resolvers");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...resourcesResolvers.Query,
    ...categoriesResolvers.Query,
    ...likesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...resourcesResolvers.Mutation,
    ...categoriesResolvers.Mutation,
    ...likesResolvers.Mutation,
  },
  User: { ...usersResolvers.User },
  AuthData: { ...usersResolvers.AuthData },
  Resource: { ...resourcesResolvers.Resource },
  Image: { ...resourcesResolvers.Image },
  Like: { ...likesResolvers.Like }
};
