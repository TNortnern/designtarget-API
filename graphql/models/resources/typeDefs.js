module.exports = `
 type Resource {
    id: ID!
    name: String!
    description: String!
    image: Image!
    createdAt: String!
    updatedAt: String!
  }
  type Image {
      url: String,
      alt: String
  }
  extend type Query {
    """
    queries all resources
    """
    resources: [Resource]

    """
    search for resource by name\n
    **Example:**\n
    query {
      resourcesLike(name:"mat"){name}
    }
    """
    resourcesLike(name: String): [Resource]
  }
  extend type Mutation {
    
    """
    create new resource
    """
    createResource(
        name: String,
        description: String,
        image: Upload,
        alt: String,
        category: String,
        importance: Integer,
        url: String,
        ): Resource
  }
`;
