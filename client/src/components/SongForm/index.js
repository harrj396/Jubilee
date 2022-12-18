import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_SONG } from '../../utils/mutations';

import Auth from '../../utils/auth';

const SongForm = ({ albumId }) => {
  const [songTitle, setSongTitle] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addSong, { error }] = useMutation(ADD_SONG);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addSong({
        variables: {
          albumId,
          songTitle,
          songArtist: Auth.getProfile().data.username,
        },
      });
      <div>{data}</div>

      setSongTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'songTitle' && value.length <= 280) {
      setSongTitle(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>What are your Albums on this Playlist?</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
              }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
          <div className="col-12 col-lg-9">
            <textarea
            name="songTitle"
            placeholder="Add your song..."
            value={songTitle}
            className="form-input w-100"
            style={{ lineHeight: '1.5', resize: 'vertical' }}
            onChange={handleChange}
            ></textarea>
          </div>
    
            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Song
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your albums. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default SongForm;







