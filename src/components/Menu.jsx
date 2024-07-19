import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

const Menu = () => {
  return (
      <Navbar bg="primary" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="#home"><h4><Badge bg="secondary" className='p-3'>Site Ecommerce</Badge></h4></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/articles">articles</Nav.Link>
            <Nav.Link as={Link} to="/categories">categories</Nav.Link>
            <Nav.Link as={Link} to="/articles/card"><Badge bg="success">cartes</Badge></Nav.Link>
            <Nav.Link as={Link} to="/articles/add">articles</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default Menu
