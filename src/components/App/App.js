import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Property from '../Property/Property';
import Carrusel from '../Carrusel/Carrusel';

function App() {
  return (
    <div className="wrapper">
      <Ppal />
      <BrowserRouter basename="/">
        <Switch>
          <Route exact path="/">
            <Carrusel />
            <Property />
          </Route>
          <Route exact path="/Properties">
            <Carrusel />
            <Property />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}


export default App;

function Ppal(  ) {
  return (
    <Navbar bg="primary" variant="light" expand="lg"  >
      <Container>
        <Navbar.Brand href="/">Prueba MillionLuxury - Roberth Campeon</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3" variant="pills"  >
              <Nav.Link href="/Properties">Properties</Nav.Link>
              {/* <Nav.Link href="/profesores">Profesores</Nav.Link>
              <Nav.Link href="/grados">Grados</Nav.Link>
              <Nav.Link href="/alumnosgrados">Alumnos Grados</Nav.Link>
              <NavDropdown title="Otros" id="basic-nav-dropdown">
                <NavDropdown.Item href="/prueba/otros1">Otros 1</NavDropdown.Item>
                <NavDropdown.Item href="/prueba/otros2">Otros 1</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/salir">Salir</NavDropdown.Item>
              </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}
