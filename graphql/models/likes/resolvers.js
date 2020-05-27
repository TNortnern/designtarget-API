const Like = require("../../../models/Like");
const { bulkValidateID } = require("../../../helpers");
module.exports = {
  Query: {
    likes: async () => await Like.find({}),
  },
  Mutation: {
    toggleLike: async (parent, { id, user, resource }) => {
      bulkValidateID([user, resource]);
      const updateObj = {
          isLiked: !isLiked,
          updatedAt: Date.now()
      }
      let like = await Like.findByIdAndUpdate(id, updateObj, { new: true }).orFail(async () => {
        return await Like.create({
          user,
          resource,
        });
      })
      if (!like) {
        throw new Error('Resource could not be updated.')
      }
      return like;
    },
  },
};
