import React from 'react';
import { Link } from 'react-router-dom';

import SongForm from "../SongForm";
import SongList from "../SongList";

const AlbumList = ({
  albums,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!albums.length) {
    return <h3>No albums Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {albums &&
        albums.map((album) => (
          <div key={album._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${album.albumArtist}`}
                >
                  {album.albumArtist} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this album on {album.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this album on {album.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{album.albumTitle}</p>
            </div>

            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/albums/${album._id}`}
            >
              Join Jubilee on this album.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default AlbumList;
