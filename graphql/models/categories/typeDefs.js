module.exports = `
 type Category {
    id: ID!
    name: String!
    description: String!
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
  }
`;