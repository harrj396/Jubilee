import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SongList from '../components/SongList';
import SongForm from '../components/SongForm';

import { QUERY_SINGLE_ALBUM } from '../utils/queries';

const SingleAlbum = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { albumId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_ALBUM, {
    // pass URL parameter
    variables: { albumId: albumId },
  });

  const album = data?.album || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {album.albumArtist} <br />
        <span style={{ fontSize: '1rem' }}>
          had this album on {album.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {album.albumTitle}
        </blockquote>
      </div>

      <div className="my-5">
        <SongList comments={album.songs} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <SongForm albumId={album._id} />
      </div>
    </div>
  );
};

export default SingleAlbum;
