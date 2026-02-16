const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Auth {
  token: ID!
  user: User
}

type User {
    _id: ID!
    username: String!
    email: String!
    spotifyId: String
    orderCount: Int
    vinylOrders: [VinylOrder]
    favoriteTracks: [FavoriteTrack]
    createdAt: String
    updatedAt: String
}

type VinylOrder {
    _id: ID!
    userId: ID!
    user: User
    trackId: String!
    trackName: String!
    artistName: String!
    albumName: String
    albumImage: String
    previewUrl: String
    vinylColor: String!
    vinylSize: String!
    price: Float!
    status: String!
    orderDate: String!
    estimatedDelivery: String
    shippingAddress: ShippingAddress
    orderSummary: String
  }

 type FavoriteTrack {
    trackId: String!
    trackName: String!
    artistName: String!
    albumName: String
    albumImage: String
  }

  type ShippingAddress {
    street: String
    city: String
    state: String
    zipCode: String
    country: String
  }

  type SpotifyTrack {
    id: String!
    name: String!
    artists: [SpotifyArtist]
    album: SpotifyAlbum
    preview_url: String
    duration_ms: Int
  }

  type SpotifyArtist {
    id: String
    name: String!
  }

  type SpotifyAlbum {
    id: String
    name: String!
    images: [SpotifyImage]
  }

  type SpotifyImage {
    url: String!
    height: Int
    width: Int
  }

  type Query {
    me: User
    getUser(id: ID!): User
    getOrders: [VinylOrder]
    getOrder(id: ID!): VinylOrder
    searchTracks(query: String!): [SpotifyTrack]
    getFavoriteTracks: [FavoriteTrack]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createOrder(orderData: OrderInput!): VinylOrder
    updateOrder(id: ID!, status: String!): VinylOrder
    deleteOrder(id: ID!): VinylOrder
    addFavoriteTrack(trackData: TrackInput!): User
    removeFavoriteTrack(trackId: String!): User
    updateProfile(email: String, username: String): User
  }

  input OrderInput {
    trackId: String!
    trackName: String!
    artistName: String!
    albumName: String
    albumImage: String
    previewUrl: String
    vinylColor: String!
    vinylSize: String!
    price: Float!
    shippingAddress: ShippingAddressInput
  }

input TrackInput {
    trackId: String!
    trackName: String!
    artistName: String!
    albumName: String
    albumImage: String
  }

    input ShippingAddressInput {
    street: String
    city: String
    state: String
    zipCode: String
    country: String
  }
`;

module.exports = typeDefs;
