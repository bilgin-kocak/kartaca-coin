import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddressSelector from './AdressSelector';

// This is the component that displays the navbar
function NavBarComponent(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">
          KTC
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav>
          <span></span>
          <AddressSelector
            accounts={props.accounts}
            setSigner={props.setSigner}
            provider={props.provider}
            setContract={props.setContract}
          ></AddressSelector>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;
