import React from 'react';
import { useQuery } from '@apollo/client';

// import AlbumList from '../components/AlbumList';
import AlbumForm from '../components/AlbumForm';

import { QUERY_ALBUMS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALBUMS);
  
  // Assign data if data exist then grab album or define albums as empty array
  const albums = data?.albums || [];  

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <AlbumForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <albumList
              albums={albums}
              title="Some Feed for Album(s)..."
            />
          )}
          <p>aaaaaaaaaaaaaaaaaaaa</p>
        </div>
      </div>
    </main>
  );
};

export default Home;
