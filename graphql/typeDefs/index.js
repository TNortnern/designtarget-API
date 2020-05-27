const { gql } = require('apollo-server-express')
const resourcesDefs = require('../models/resources/typeDefs')
const categoriesDefs = require('../models/categories/typeDefs')
const likesDefs = require('../models/likes/typeDefs')
const userDefs = require('../models/users/typeDefs')
const masterDef = gql`
type Query {
    baseQuery: String
}
type Mutation {
    baseMutation: String
}
`
module.exports = [masterDef, categoriesDefs, likesDefs, resourcesDefs, userDefs]
