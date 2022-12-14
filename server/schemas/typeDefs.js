const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Auth {
  token: ID!
  user: User
}

type Query{
  me: User
}

type User {
  _id: ID!
  username: String!
  email: String
  albumCount: String
  savedAlbums: [ Album ]
}

type Album {
  _id: ID!
  albumArtist: String
  albumTitle: String!
  albumDescription: String!
  songs: [ Song ]
}

type Song {
  _id: ID!
  songArtist: String
  songTitle: String!
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  savedAlbums(albumDescription: String!, albumTitle: String!): Album
  deleteAlbum(_id: ID!): Album
}
`;

module.exports = typeDefs;
