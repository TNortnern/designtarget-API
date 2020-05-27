module.exports = `
  type User {
    id: ID!
    email: String!
    name: String!
    resources: Resource
    createdAt: String!
    updatedAt: String!
  }
  type AuthData {
    id: ID
    user: User
    token: String
  }
  extend type Query {

    """
    query for all users
    """
    users: [User]


    """
    searching for users by their name 
    """
    usersLike(name: String): [User]


    """
    get one user by its email   
    """
    userByEmail(email: String): User


    """
    get a user by their jwt auth token
    """
    userByToken(token: String): User


    """
    brings the mongoDB interface to GraphQL. You can just write in there like it was JS.\n
    **Example:**\n
    query {
      usersByFindString(findString:"{name:'test'}"){name}
    }    
    """
    usersByFindString(findString: String): [User]


    """
    Log in with email and password
    """
    login(user: loginInput): AuthData


  }
  extend type Mutation {
    """
    Creating new user
    """
    createUser(
      user: userInput
    ): AuthData
    
  }
`;
