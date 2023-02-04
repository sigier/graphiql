const { gql } = require("apollo-server-express");

const typeDefs = gql `
    type Query {
        user(id:ID!):User!
        post(id:ID!):Post!
        posts(sort: SortInput, queryBy: QueryByInput):[Post]
        isAuth:User!
        categories(catId: ID!):[Category]!
    }

    type Mutation {
        updateUserEmailPass(email:String, password:String, _id:ID!):User!
        updateProfile(name:String,  lastname:String, _id:ID!):User!
        authUser(fields: AuthInput!):User!
        signUp(fields: AuthInput!):User!
        createPost(fields: PostInput!):Post!
        createCategory(name: String!): Category!
    }

    type Post {
        _id: ID!
        title: String!
        excerpt: String!
        content: String!
        created_at: String
        updated_at: String
        author: User!
        status: PostStatus
        category: Category
    }

    type User {
        _id:ID!
        email:String!
        password:String
        name:String
        lastname:String
        token:String,
        posts:[Post!]!,
        categories:[Categoty!]!
    }

    type Category {
        _id:ID!
        name:String!
        author: User!
        posts: [Post]
    }

    input AuthInput {
        email:String!
        password:String!

    }
    input PostInput {
        title: String
        excerpt: String
        content: String
        status: PostStatus,
        category: ID
    }

    input SortInput {
        sortBy: String
        order: String
        limit: Int
        skip: Int
    }

    input QueryByInput {
        key: String!
        value: String!
    }

    input QueryByInput {

    }

    enum PostStatus {
        PUBLIC,
        DRAFT
    }
`;

module.exports = typeDefs;