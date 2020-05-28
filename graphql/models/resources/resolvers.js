const Resource = require("../../../models/Resource");
const Category = require("../../../models/Category");
const Like = require("../../../models/Like");
const { createResource, updateResource } = require("./helpers")
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
      return await createResource(
        name,
        description,
        image,
        alt,
        category,
        url,
        importance
      );
    },
    updateResource: async (
      parent,
      { id, name, description, image, alt, category, url, importance }
    ) => {
      
      return await updateResource(
        id,
        name,
        description,
        image,
        alt,
        category,
        url,
        importance
      );
    },
    deleteResource: async (parent, { id } ) => {
      validateID(id)
      const resource = await Resource.findByIdAndDelete(id);
      if (resource) return true
      else return false
    }
  },
  Resource: {
    likes: async (parent) => {
      return await Like.find({ resource: parent.id });
    },
    category: async(parent) => {
      return await Category.find({ _id: parent.category })
    }
  },
  Image: {
    url: (parent) => parent.url,
    alt: (parent) => parent.alt,
  },
};
