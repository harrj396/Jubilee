// import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        </Container>
      </Navbar>
      <img className='img1' src='/vinyll.jpg' height={420}></img>
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
  }
  const _getGenres = async (token) => {
    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
});
  
  const data = await result.json();
  return data.categories.items;

  } 

  const _getTracks = async (token, tracksEndPoint) => {
    const limit = 10;
    const result = await fetch (`${tracksEndPoint}?limit=$(limit)`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    });
    const data = await result.json();
    return data.items;
  }