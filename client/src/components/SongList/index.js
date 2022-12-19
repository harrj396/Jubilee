import React from 'react';

const SongList = ({ songs = [] }) => {
  if (!songs.length) {
    return <h3>Songs</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Songs
      </h3>
      <div className="flex-row my-4">
        {songs &&
          songs.map((song) => (
            <div key={song._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {song.songArtist} sanged{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {song.createdAt}
                  </span>
                </h5>
                <p className="card-body">{song.songTitle}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default SongList;
