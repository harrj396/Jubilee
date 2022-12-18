import React from 'react';
import { useQuery } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import './Home.css';

// import AlbumList from '../components/AlbumList';
import AlbumForm from '../components/AlbumForm';

import { QUERY_ALBUMS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALBUMS);

  // Assign data if data exist then grab album or define albums as empty array
  const albums = data?.albums || [];

  return (
    <div>
      <img className='img1' src='/pexels-matthias-groeneveld-3916058.jpg' height={420}></img>
      <h1 className='textover'>Design your Custom Vinyl today!</h1>
      <Button id='button1' href='signup' variant="primary">Get Started</Button>{' '}
      <img className='img1' src='/vinyll.jpg' height={420}></img>
      <p> We're a small team of devs who thought it would be a cool idea to make a custom set of songs in tangible form! Little did we know, this idea wasn't original and already available. But we figured we would still try anyways and aim for a marlet the other sites haven't. You can easily pay a starting of 100 USD for a custom vinyl; but for us, we stick to the basics and offer a price that reflects that! Balling on a budget as they say!</p>
      {/* <div className="flex-row justify-center">
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
     
          
        </div>
      </div> */}

    </div>

  );
};

export default Home;
