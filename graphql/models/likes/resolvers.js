const Like = require("../../../models/Like");
const Resource = require("../../../models/Resource");
const User = require("../../../models/User");
const { bulkValidateID } = require("../../../helpers");
module.exports = {
  Query: {
    likes: async () => await Like.find({}),
  },
  Mutation: {
    toggleLike: async (parent, { id, user, resource }) => {
      bulkValidateID([user, resource]);
      let like = await Like.findById(id);
      if (like) {
        let currentValue = like.isLiked;
        like.isLiked = !currentValue;
        like.updatedAt = Date.now();
        await like.save()
      } else {
        await Like.create({
          user,
          resource,
        });
      }
      return await User.findById(user)
    },
  },
  Like: {
    resource: async (parent) => await Resource.findById(parent.resource),
    user: async (parent) => await User.findById(parent.user)
  }
};
