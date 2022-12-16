import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Jubilee</Navbar.Brand>
        <Nav className="">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#record">Make a Record</Nav.Link>
          <Nav.Link href="/about">About Us</Nav.Link>
          
        </Nav>
        <Button href='login' className='me-3' variant="light">Login</Button>{' '}
        {/* <Button href='signup' variant="light">Sign Up</Button>{' '} */}
      </Container>
    </Navbar>
    </>
  );
};

export default Header;
