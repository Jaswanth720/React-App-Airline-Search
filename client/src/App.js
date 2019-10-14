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
          <h1 className="display-3">Airlines on Country</h1>
          <p className="lead">Find list of airports operating in the Country X!</p>
          <InputGroup>
            <Input placeholder="Enter Country Name"/>
            <InputGroupAddon addonType="append">
              <Button color="primary" >Get Airlines</Button>
            </InputGroupAddon>
            
          </InputGroup>
        </Jumbotron>
      </Col>
    </Row>

    <Row>
      <Col>
        <Jumbotron>
          <h1 className="display-3">Airline on number of stops</h1>
          <p className="lead">Find the list of Airlines having X stops </p>
          <InputGroup>
            <Input placeholder="Enter Country Name"/>
            <InputGroupAddon addonType="append">
              <Button color="primary" >Get Airlines</Button>
            </InputGroupAddon>
            
          </InputGroup>
        </Jumbotron>
      </Col>
    </Row>

    <Row>
      <Col>
        <Jumbotron>
          <h1 className="display-3">Airline Using Codeshare</h1>
          <p className="lead">List of airlines operating with code share</p>
          <InputGroup>
            <Input placeholder="Enter Country Name"/>
            <InputGroupAddon addonType="append">
              <Button color="primary" >Get Airlines</Button>
            </InputGroupAddon>
            
          </InputGroup>
        </Jumbotron>
      </Col>
    </Row>


    <Row>
      <Col>
        <Jumbotron>
          <h1 className="display-3">Active Airlines</h1>
          <p className="lead">Find the list of active airlines in the United States</p>
          <InputGroup>
            <Input placeholder="Enter Country Name"/>
            <InputGroupAddon addonType="append">
              <Button color="primary" >Get Airlines</Button>
            </InputGroupAddon>
            
          </InputGroup>
        </Jumbotron>
      </Col>
    </Row>


    <Row>
      <Col>
        <Jumbotron>
          <h1 className="display-3">Highest Airports</h1>
          <p className="lead">Which country (or) territory has the highest number of Airports</p>
          <InputGroup>
            <Input placeholder="Enter Country Name"/>
            <InputGroupAddon addonType="append">
              <Button color="primary" >Get Airlines</Button>
            </InputGroupAddon>
            
          </InputGroup>
        </Jumbotron>
      </Col>
    </Row>



    <Row>
      <Col>
        <Jumbotron>
          <h1 className="display-3">Top Cities</h1>
          <p className="lead">Top K cities with most incoming/outgoing airlines</p>
          <InputGroup>
            <Input placeholder="Enter Country Name"/>
            <InputGroupAddon addonType="append">
              <Button color="primary" >Get Airlines</Button>
            </InputGroupAddon>
            
          </InputGroup>
        </Jumbotron>
      </Col>
    </Row>



    <Row>
      <Col>
        <Jumbotron>
          <h1 className="display-3">Find Trips</h1>
          <p className="lead">Define a trip as a sequence of connected route. Find a trip that connects two cities X and Y (reachability)</p>
          <InputGroup>
            <Input placeholder="Enter Country Name"/>
            <InputGroupAddon addonType="append">
              <Button color="primary" >Get Airlines</Button>
            </InputGroupAddon>
            
          </InputGroup>
        </Jumbotron>
      </Col>
    </Row>


    <Row>
      <Col>
        <Jumbotron>
          <h1 className="display-3">Find Trips with K stops</h1>
          <p className="lead">Find a trip that connects X and Y with less than Z stops (constrained reachability)</p>
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
