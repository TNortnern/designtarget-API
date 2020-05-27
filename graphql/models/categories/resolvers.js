const Category = require("../../../models/Category");

module.exports = {
  Query: {
    categories: () => Category.find({}),
    categoriesLike: async (parent, { name }) => {
      return await Category.find({ name: new RegExp(name, "i") });
    }
  },
  Mutation: {
    createCategory: async (parent, { name, description }) => {
      const category = await new Category({
        name,
        description,
      });
      return category.save();
    }
  },
};