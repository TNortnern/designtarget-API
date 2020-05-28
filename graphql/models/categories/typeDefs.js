module.exports = `
 type Category {
    id: ID!
    name: String!
    description: String!
    resources: [Resource]
    topFour: [Resource]
    createdAt: String!
    updatedAt: String!
  }
  extend type Query {
    """
    queries all categories
    """
    categories: [Category]

    """
    search for category by name\n
    **Example:**\n
    query {
      categoriesLike(name:"mat"){name}
    }
    """
    categoriesLike(name: String): [Category]
  }
  extend type Mutation {
    
    """
    create new category
    """
    createCategory(name: String, description: String): Category

    """
    update a category
    """
    updateCategory(id: ID, name: String, description: String): Category

    """
    deletes a category
    """
    deleteCategory(id: ID): Category
  }
`;