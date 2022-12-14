import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ALBUM = gql`
  mutation addAlbum($albumTitle: String!) {
    addAlbum(albumTitle: $albumTitle) {
      _id
      albumTitle
      albumArtist
      createdAt
      songs {
        _id
        songTitle
      }
    }
  }
`;

export const ADD_SONG = gql`
  mutation addSong($albumId: ID!, $songTitle: String!) {
    addSong(albumId: $albumId, songTitle: $songTitle) {
      _id
      albumTitle
      albumArtist
      songs {
        _id
        songTitle
      }
    }
  }
`;
