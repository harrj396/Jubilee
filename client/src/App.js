// import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React, {useEffect, useState} from 'react';

function ColorSchemesExample() {

  const spotify_client_Id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  // const [accessToken, setAccessToken] = useState("") 
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
    
  

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Jubilee</Navbar.Brand>
          <Nav className="me-auto">

            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#record">Make a Record</Nav.Link>
            <Nav.Link href="#about">About Us</Nav.Link>
            
          </Nav>
          <Button href='login' className='me-3' variant="light">Login</Button>{' '}
          <Button href='signup' variant="light">Sign Up</Button>{' '}
        </Container>
      </Navbar>
      <img className='img1' src='/vinyll.jpg' height={420}></img>
      <h1 className='textover'>Design your Custom Vinyl today!</h1>
      <Button id='button1' href='signup' variant="primary">Get Started</Button>{' '}
    </>
  );
}


  

export default ColorSchemesExample;