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
      getActiveList: [],
      // getCountries: "",
      getCounriesList:[],
      getTopCitiesList:[],
      get_source_airport_id: 0,
      get_destination_airport_id : 0,
      get_trips_List: []

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
    this.setState({
      get_source_airport_id: event.target.value,
    });
    this.setState({
      get_destination_airport_id: event.target.value
    });
    // this.setState({
    //   getCountries: event.target.value
    // });
  }

  updateInputValue2(event) {
    this.setState({
      get_destination_airport_id: event.target.value
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
  handleGetCountriesButton = async () => {
    // const get_countries = this.state.getCountries;
    const res = await axios.get(`/api/countries/most_airports/airports`);
    const  data  = res.data;
    console.log(data);  
    this.setState({ getCounriesList: data});
    console.log(this.state.getCounriesList);
  }

  handleGetTopCitiesButton = async () => {
    // const get_countries = this.state.getCountries;
    const res = await axios.get(`/api/countries/top_cities/cities`);
    const  data  = res.data;
    console.log(data);  
    this.setState({ getTopCitiesList: data});
    console.log(this.state.getTopCitiesList);
  }

  handleGetTripsButton = async () => {
    const source_airport_value = this.state.get_source_airport_id;
    const destination_airport_value = this.state.get_destination_airport_id;
    const res = await axios.get(`/api/countries/find_trip/${source_airport_value}/${destination_airport_value}`);
    const  data  = res.data;
    console.log(data);
    this.setState({ get_trips_List: data});      
    console.log(this.state.get_trips_List);
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
          <h1 className="display-3">Highest Airports in countries</h1>
          <p className="lead">Which country (or) territory has the highest number of Airports</p>
          <InputGroup>
            <Input placeholder="Click the button" />
              <Button color="primary" onClick={this.handleGetCountriesButton.bind(this)}>Get Countries</Button> 
          </InputGroup>
          {this.state.getCounriesList.length > 1 && (
            <div>
            <h5 style={{ marginTop: '15px', marginBotton: '5px'}}>Results: </h5>
            <hr />
          <div className="getCountryTable" style={{ marginTop: '10px', overflowY: 'auto', height: '300px'}}>
            <Table dark striped>
              <thead>
                <tr>
                  <th></th>
                  <th>Country names</th>
                  <th>Number of Airports</th>
                </tr>
              </thead>
              <tbody>
                {this.state.getCounriesList.map((row, index) => {
                  return(
                    <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.country}</td>
                    <td>{row.occurrences}</td>
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
          <h1 className="display-3">Top Cities</h1>
          <p className="lead">Top K cities with most incoming/outgoing airlines</p>
          <InputGroup>
            <Input placeholder="Click the button" />
              <Button color="primary" onClick={this.handleGetTopCitiesButton.bind(this)}>Get Cities</Button> 
          </InputGroup>
          {this.state.getTopCitiesList.length > 1 && (
            <div>
            <h5 style={{ marginTop: '15px', marginBotton: '5px'}}>Results: </h5>
            <hr />
          <div className="getCountryTable" style={{ marginTop: '10px', overflowY: 'auto', height: '300px'}}>
            <Table dark striped>
              <thead>
                <tr>
                  <th></th>
                  <th>City </th>
                  <th>Country</th>
                  <th>Number of Incoming Airlines</th>
                  <th>Number of Outgoing Airlines</th>
                </tr>
              </thead>
              <tbody>
                {this.state.getTopCitiesList.map((row, index) => {
                  return(
                    <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.city}</td>
                    <td>{row.country}</td>
                    <td>{row.incoming}</td>
                    <td>{row.outgoing}</td>
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
          <h1 className="display-3">Find Trips</h1>
          <p className="lead">Define a trip as a sequence of connected route. Find a trip that connects two cities X and Y (reachability)</p>
          <InputGroup>
            <Input placeholder="Enter Source airport Name" onChange={this.updateInputValue.bind(this)}/>
            <Input placeholder="Enter Destination airport Name" onChange={this.updateInputValue2.bind(this)}/>
            <InputGroupAddon addonType="prepend">
              <Button color="primary" onClick={this.handleGetTripsButton.bind(this)}>Get Airlines</Button>
            </InputGroupAddon>
            </InputGroup>
            {this.state.get_trips_List.length > 0 && (
            <div>
            <h5 style={{marginTop: '15px', marginBotton: '5px'}}>Results: </h5>
            <hr />
          <div className="getCountryTable" style={{marginTop: '10px', overflowY: 'auto', height: '300px'}}>
            <Table dark striped>
              <thead>
                <tr>
                  <th></th>
                  <th>Route_id </th>
                  <th>Source_aiport_id</th>
                  <th>Destination_aiport_id</th>
                  <th>Number of stops</th>
                  <th>Distance</th>
                </tr>
              </thead>
              <tbody>
                {this.state.get_trips_List.map((row, index) => {
                  return(
                    <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.route_id}</td>
                    <td>{row.source_airport_id}</td>
                    <td>{row.destination_airport_id}</td>
                    <td>{row.num_stops}</td>
                    <td>{row.distance}</td>
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
          <h1 className="display-3">Find Trips with K stops</h1>
          <p className="lead">Find a trip that connects X and Y with less than Z stops (constrained reachability)</p>
          <InputGroup>
            <Input placeholder="Enter Country Name" />
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
          <h1 className="display-3">Find cities within d hops</h1>
          <p className="lead">Find all the cities reachable within d hops of a city (X) (bounded reachability). </p>
          <InputGroup>
            <Input placeholder="Enter Country Name" />
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
