// import logo from './logo.svg';
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
        </Container>
      </Navbar>
      <img className='img1' src='/vinyll.jpg' height={420}></img>
      <h1 className='textover'>Design your Custom Vinyl today!</h1>
      <Button className='d-flex justify-content-center' id='button1' href='#login' variant="primary">Get Started</Button>{' '}
    </>
  );
}

export default ColorSchemesExample;