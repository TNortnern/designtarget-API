const Like = require("../../../models/Like");
const Resource = require("../../../models/Resource");
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
      return await Resource.findById(resource)
    },
  },
  Like: {
    resource: async (parent) => await Resource.findById(parent.resource)
  }
};
