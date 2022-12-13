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

  const clientId = process.env.REACT_APP_clientId;
  const clientSecret = process.env.REACT_APP_clientSecret;

  // private method
  const _getToken = async () => {

    const result = await fetch ('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
      },
      body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    return data.access_token;
  }
})
