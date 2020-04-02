import './dashboard.css';
import { Navbar, Nav, NavDropdown, Form,  FormControl, Button} from 'react-bootstrap';
import React, {Component} from 'react';
import ClientList from './ClientList';
import GraphCard from './Card';
import SideDrawer from './sideDrawer';
// import SideNav from './sidenav';





export default class DashBoard extends Component{
    render(){
        return(

    <div className="app">
    <header className="main">
      <Navbar expand="lg" variant="dark" bg="info">
        <Navbar.Brand href="#home">Welcome Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/clients">Clients</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item>Action</NavDropdown.Item>
                  <NavDropdown.Item>Another action</NavDropdown.Item>
                  <NavDropdown.Item>Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-danger">Search</Button>
            </Form>
        </Navbar.Collapse>
      </Navbar>
    </header>
    <div><SideDrawer/></div>
    <main className="main">
    <div>
        <GraphCard/>
    </div>
          <h4 className="card-header">Device Location</h4>
          <div className="card-body">
          {/* <MapContainer/> */}
          </div>
    <div>
    <h1 className="text-primary mb-3">Client Table</h1>
      <ClientList/>
    </div>
    </main>
  </div>

        );
    }

}
