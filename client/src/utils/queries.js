import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      albums {
        _id
        albumTitle
      }
    }
  }
`;

export const QUERY_ALBUMS = gql`
  query getAlbums {
    albums {
      _id
      albumTitle
      albumArtist
    }
  }
`;

export const QUERY_SINGLE_ALBUM = gql`
  query getSingleAlbum($albumId: ID!) {
    thought(thoughtId: $albumId) {
      _id
      albumTitle
      albumArtist
      albumDescription
      songs {
        _id
        songTitle
        songArtist
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      albums {
        _id
        albumTitle
        albumArtist
      }
    }
  }
`;
