const Category = require("../../../models/Category");
const { validateID } = require('../../../helpers')
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
    },
    updateCategory: async (parent, { id, name, description }) => {
      validateID(id)
      const category = await Category.findById(id);
      if (!category) throw new Error('Category not found.')
      if (name) category.name = name
      if (description) category.description = description
      return category.save();
    },
    deleteCategory: async (parent, { id }) => {
      validateID(id);
      return await Category.findByIdAndDelete(id).orFail(() => {
        throw new Error("Category could not be found or error while updating.")
      })       
    }

  },
};