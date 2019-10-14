import React from 'react';
 
import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Jumbotron,
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
  Col
} from 'reactstrap';

function App() {
  return (
    <Container fluid className="centered">
    <Navbar dark color="dark">
      <NavbarBrand href="/">Airline Search</NavbarBrand>
    </Navbar>
    <Row>
      <Col>
        <Jumbotron>
          <h1 className="display-3">Airline Search</h1>
          <p className="lead">Airline Search from Open flight Database!</p>
          <InputGroup>
            <Input placeholder="Enter Country Name"/>
            <InputGroupAddon addonType="append">
              <Button color="primary" >Get Airlines</Button>
            </InputGroupAddon>
            
          </InputGroup>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
  );
}

export default App;
