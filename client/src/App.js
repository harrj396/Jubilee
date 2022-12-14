// import logo from './logo.svg';
import React from "react";
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function ColorSchemesExample() {
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

// Spotify API data

const APIController = (function() {

  const spotify_client_Id = process.env.SPOTFIY_CLIENT_ID;
  const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  // private method
  const _getToken = async () => {

    const result = await fetch ('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify_client_Id + ':' + spotify_client_secret)
      },
      body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    return data.access_token;
  }})