import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_ALBUM } from "../../utils/mutations";
import { QUERY_ALBUMS, QUERY_ME } from "../../utils/queries";

import SearchSpotify from "../SearchSpotify";
import Auth from "../../utils/auth";

const AlbumForm = () => {
  const [AlbumTitle, setAlbumTitle] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [addAlbum, { error }] = useMutation(ADD_ALBUM, {
    update(cache, { data: { addAlbum } }) {
      try {
        const { albums } = cache.readQuery({ query: QUERY_ALBUMS });

        cache.writeQuery({
          query: QUERY_ALBUMS,
          data: { albums: [addAlbum, ...albums] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, albums: [...me.albums, addAlbum] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addAlbum({
        variables: {
          AlbumTitle,
          albumArtist: Auth.getProfile().data.username,
        },
      });
      <div>{data}</div>
      setAlbumTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "albumTitle" && value.length <= 280) {
      setAlbumTitle(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What songs are in your Album?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <SearchSpotify />
    


        </>
      ) : (
        <p>
          You need to be logged in to create your Album. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default AlbumForm;





      {/* <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="albumTitle"
                placeholder="Here's a new album..."
                value={AlbumTitle}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Album
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form> */}