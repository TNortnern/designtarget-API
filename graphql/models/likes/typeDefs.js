module.exports = `
type Like {
    id: ID
    user: User
    resource: Resource
    isLiked: Boolean
    createdAt: String
    updatedAt: String
}

type LikeData {
    user: User
    like: Like
}

extend type Query {
    """
    get all likes
    """
    likes: [Like]

    like: Like
}
extend type Mutation {
    """
    toggle like of a resource
    """
    toggleLike(id: ID, user: ID, resource: ID): LikeData
}
`