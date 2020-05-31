const Like = require("../../../models/Like");
const Resource = require("../../../models/Resource");
const User = require("../../../models/User");
const { bulkValidateID } = require("../../../helpers");
module.exports = {
  Query: {
    likes: async () => await Like.find({}),
    like: async (parent, { id }) => await Like.findById(id) 
  },
  Mutation: {
    toggleLike: async (parent, { id, user, resource }) => {
      bulkValidateID([user, resource]);
      // try to find by id first, if that fails, try to find by user and resource
      let like = await Like.findById(id);
      if (!like) { 
        like = await Like.findOne({ user, resource })
      }
      let newLike;
      if (like) {
        let currentValue = like.isLiked;
        like.isLiked = !currentValue;
        like.updatedAt = Date.now();
        newLike = await like.save()
      } else {
        newLike = await Like.create({
          user,
          resource,
        });
      }
      return await { user: User.findById(user), like: newLike }
    },
  },
  Like: {
    resource: async (parent) => await Resource.findById(parent.resource),
    user: async (parent) => await User.findById(parent.user)
  },
  LikeData: {
    user: (parent) => parent.user,
    like: (parent) => parent.like
  }
};
