// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';


function App() {

  const spotify_client_Id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const [accessToken, setAccessToken] = useState("") 
  const authParameters = {
    method: 'POST',
    headers: {
    'Content-Type' : 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=' + spotify_client_Id + '&client_secret=' + spotify_client_secret
  }
  
  
  console.log('hey')
  function ypp() {
    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    .then(data => console.log(data.access_token))
    console.log('hello')
  }
 
  useEffect(() => {
    ypp()
  });
    
  async function search() {
    console.log("Searching for")
  }
  const [searchInput, setSearchInput] = useState("")
  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
          placeholder="Search for Artist"
          type="input"
          onKeyPress={event => {
            if (event.key == "Enter") {
              console.log("Enter pressed")
            }
          }}
          onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={() => {console.log("howdy")}}>Search Artist</Button>
        </InputGroup>
      </Container>
    </div>
  );
}


  

export default App;