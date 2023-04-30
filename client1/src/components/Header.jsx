import { Container, Nav, Navbar, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <LinkContainer to="/" >
          <Navbar.Brand >TimeTableGen</Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link >Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/maptt">
            <Nav.Link >Create TT</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/retrieve">
            <Nav.Link >Find TT</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/classform">
            <Nav.Link>Upload Class</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/courseform">
            <Nav.Link>Upload Courses</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          <OverlayTrigger key='bottom' trigger="hover" placement='bottom' overlay={
            <Tooltip id={`tooltip-bottom`}>
              Download a <strong>Template xlsx file</strong> for uploading the class and course Details.
            </Tooltip>
          }>
            <Nav.Link href='http://localhost:3001/template'>Download Template</Nav.Link>
          </OverlayTrigger>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;