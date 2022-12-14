const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    albums: [Album]!
  }

  type Album {
    _id: ID
    albumText: String
    albumCreator: String
    createdAt: String
    songs: [Song]!
  }

  type Song {
    _id: ID
    songName: String
    songArtist: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    albums(username: String): [Album]
    album(albumId: ID!): Album
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Album
    removeAlbum(albumId: ID!): Album
    removeSong(albumId: ID!, commentId: ID!): Song
  }
`;

module.exports = typeDefs;
