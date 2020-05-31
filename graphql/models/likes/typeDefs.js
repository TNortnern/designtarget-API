module.exports = `
type Like {
    id: ID
    user: User
    resource: Resource
    isLiked: Boolean
    createdAt: String
    updatedAt: String
}

extend type Query {
    """
    get all likes
    """
    likes: [Like]
}
extend type Mutation {
    """
    toggle like of a resource
    """
    toggleLike(id: ID, user: ID, resource: ID): User
}
`