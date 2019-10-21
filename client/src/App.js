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
  Col,
Table
} from 'reactstrap';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      getAirlineInput: "",
      getAirlineData: [], //gets airpost for country /api/country/ (param)
      getStops: [],
      stopsInput: 0,
      get_codeshareInput:"",
      getcodeshare: [],
      get_Active_Input:"",
      getActiveList: []
    }
  }


  updateInputValue(event) {
    this.setState({
      getAirlineInput: event.target.value
    });
    this.setState({
      stopsInput: event.target.value
    });
    //this.setState({});
    this.setState({
      get_codeshareInput: event.target.value
    });
    this.setState({
      get_Active_Input: event.target.value
    });
  }

  handleGetAirlineButton = async() => {
    const countryRequested = (this.state.getAirlineInput).replace((this.state.getAirlineInput).charAt(0), (this.state.getAirlineInput).charAt(0).toUpperCase());
    const res = await axios.get(`/api/countries/${countryRequested}`);
    const  data  = res.data;
    this.setState({ getAirlineData: data});
  }

  handleGetStopsButton = async () => {
    const stops = this.state.stopsInput;
    const res = await axios.get(`/api/countries/stops/${stops}`);
    const  data  = res.data;
    console.log(data);
    this.setState({ getStops: data});
    console.log(this.state.getStops);
  }

  handleGetCodeshareButton = async () => {
    const get_codeshare = this.state.get_codeshareInput;
    const res = await axios.get(`/api/countries/codeshare/${get_codeshare}`);
    const  data  = res.data;
    console.log(data);  
    this.setState({ getcodeshare: data});
    console.log(this.state.getcodeshare);
  }

  handleGetActiveButton = async () => {
    const active_value = this.state.get_Active_Input;
    const res = await axios.get(`/api/countries/active/${active_value}`);
    const  data  = res.data;
    console.log(data);  
    this.setState({ getActiveList: data});
    console.log(this.state.getActiveList);
  }

// dark: #343a40
  render() {
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
            <Input placeholder="Enter Country Name" onChange={this.updateInputValue.bind(this)} />
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={this.handleGetAirlineButton.bind(this)}>Get Airlines</Button>
            </InputGroupAddon>
          </InputGroup>
          {this.state.getAirlineData.length > 1 && (
            <div>
            <h5 style={{ marginTop: '15px', marginBotton: '5px'}}>Results: </h5>
            <hr />
          <div className="getCountryTable" style={{ marginTop: '10px', overflowY: 'auto', height: '300px'}}>
            <Table dark striped>
              <thead>
                <tr>
                  <th></th>
                  <th>Airport Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.getAirlineData.map((row, index) => {
                  return(
                    <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.name}</td>
                  </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          </div>
          )}
        </Jumbotron>
      </Col>
    </Row>

    <Row>
      <Col>
        <Jumbotron>
          <h1 className="display-3">Airline on number of stops</h1>
          <p className="lead">Find the list of Airlines having X stops </p>
          <InputGroup>
            <Input placeholder="Enter Country Name" onChange={this.updateInputValue.bind(this)} />
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={this.handleGetStopsButton.bind(this)}>Get Airlines</Button>
            </InputGroupAddon>
          </InputGroup>
          {this.state.getStops.length > 1 && (
            <div>
            <h5 style={{ marginTop: '15px', marginBotton: '5px'}}>Results: </h5>
            <hr />
          <div className="getCountryTable" style={{ marginTop: '10px', overflowY: 'auto', height: '300px'}}>
            <Table dark striped>
              <thead>
                <tr>
                  <th></th>
                  <th>Airport Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.getStops.map((row, index) => {
                  return(
                    <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.name}</td>
                  </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          </div>
          )}

        </Jumbotron>
      </Col>
    </Row>

    <Row>
      <Col>
        <Jumbotron>
          <h1 className="display-3">Airline Using Codeshare</h1>
          <p className="lead">List of airlines operating with code share</p>
          <InputGroup>
            <Input placeholder="Enter Country Name" onChange={this.updateInputValue.bind(this)}/>
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={this.handleGetCodeshareButton.bind(this)}>Get Airlines</Button>
            </InputGroupAddon>          
          </InputGroup>
          {this.state.getcodeshare.length > 1 && (
            <div>
            <h5 style={{ marginTop: '15px', marginBotton: '5px'}}>Results: </h5>
            <hr />
          <div className="getCountryTable" style={{ marginTop: '10px', overflowY: 'auto', height: '300px'}}>
            <Table dark striped>
              <thead>
                <tr>
                  <th></th>
                  <th>Airline Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.getcodeshare.map((row, index) => {
                  return(
                    <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.name}</td>
                  </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          </div>
          )}
        </Jumbotron>
      </Col>
    </Row>


    <Row>
      <Col>
        <Jumbotron>
          <h1 className="display-3">Active Airlines</h1>
          <p className="lead">Find the list of active airlines in the United States</p>
          <InputGroup>
            <Input placeholder="Enter Country Name"  onChange={this.updateInputValue.bind(this)}/>
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={this.handleGetActiveButton.bind(this)}>Get Airlines</Button>
            </InputGroupAddon> 
          </InputGroup>
          {this.state.getActiveList.length > 1 && (
            <div>
            <h5 style={{ marginTop: '15px', marginBotton: '5px'}}>Results: </h5>
            <hr />
          <div className="getCountryTable" style={{ marginTop: '10px', overflowY: 'auto', height: '300px'}}>
            <Table dark striped>
              <thead>
                <tr>
                  <th></th>
                  <th>Airline Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.getActiveList.map((row, index) => {
                  return(
                    <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.name}</td>
                  </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          </div>
          )}
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
}

export default App;
