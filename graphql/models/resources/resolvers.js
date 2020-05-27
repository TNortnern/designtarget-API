const Resource = require("../../../models/Resource");
const { fileUpload, validateID } = require("../../../helpers");
module.exports = {
  Query: {
    resources: () => Resource.find({}),
    resourcesLike: async (parent, { name }) => {
      return await Resource.find({ name: new RegExp(name, "i") });
    },
  },
  Mutation: {
    createResource: async (
      parent,
      { name, description, image, alt, category, url, importance }
    ) => {
      validateID(category);
      const imageURL = await fileUpload(image);
      const image = {
        url: imageURL,
        alt,
      };
      const resource = await new Resource({
        name,
        description,
        category,
        image,
        url,
        importance,
      });
      return resource.save();
    },
  },
};
