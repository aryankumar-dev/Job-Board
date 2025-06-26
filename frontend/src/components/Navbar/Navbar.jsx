import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'
import { Navbar, Nav, Container } from 'react-bootstrap';

function ResponsiveNavbar() {
   
 return (
    <Navbar bg="light" expand="md" className="px-3">
      <Container fluid>
        <Navbar.Brand href="#">HireMe</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#saved-jobs">Saved Jobs</Nav.Link>
            <Nav.Link href="#logo1">Logo</Nav.Link>
            <Nav.Link href="#logo2">Logo</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}

export default ResponsiveNavbar;