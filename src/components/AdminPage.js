import './dashboard.css';
import { Navbar, Nav, NavDropdown, Form,  FormControl, Button, CardGroup} from 'react-bootstrap';
import React, {Component} from 'react';
import ClientList from './ClientList';
import Devices from './Devices';
import GraphCard from './Card';
import SideDrawer from './sideDrawer';
import BarGraph from './BarGraph';
import { MapContainer } from './map';


export default class AdminPage extends Component{
    render(){
        return(

            <div className="app">
                <div><SideDrawer/></div>
                <main className="main">
                <div>
                    <GraphCard/>
                </div>
                <div>
                    <BarGraph/>
                </div>
                <div className="row">
                   <div className="col-sm-6"> <ClientList/></div>
                    <div className="col-sm-6"><Devices/></div>   
                </div>
                <div>
                    <MapContainer/>
                </div>
                </main>
            </div>
        );
    }
}
