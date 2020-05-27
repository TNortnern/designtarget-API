module.exports = `
 type Resource {
    id: ID!
    name: String!
    description: String!
    image: Image!
    likes: [Like]
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

    """
    get resources liked by current user
    """
    likedByUser(user: ID): Boolean
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
        importance: Int,
        url: String,
        ): Resource
  }
`;
