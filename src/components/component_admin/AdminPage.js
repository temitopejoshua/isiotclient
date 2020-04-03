import { Navbar, Nav, NavDropdown, Form,  FormControl, Button, CardGroup} from 'react-bootstrap';
import React, {Component} from 'react';
import ClientList from './ClientList';
import Devices from './Devices';
import GraphCard from './Card';
import SideDrawer from './sideDrawer';
import BarGraph from './BarGraph';
import MapContainer from './map';
import TopNavBar from './TopNavbar';
import './Admin.css';
import SideNav from './Sidenav'; 
import Footer from './footer';



export default class AdminPage extends Component{
    render(){
        return(

            <div className="wrapper">
                <div>
                    <SideNav/>
                </div>
                <div className="main">
                <div>
                    <TopNavBar/>
                </div>
                <div className="div_margin"> 
                    <GraphCard/>
                </div>
                <div className="div_margin"> 
                    <BarGraph/>
                </div>
                <div className="row div_margin">
                   <div className="col-lg-6"> <ClientList/></div>
                    <div className="col-lg-6"><Devices/></div>   
                </div>
                <div className="div_margin"> 
                    <MapContainer/>
                </div>
                <div className="div_margin"> 
                    <Footer/>
                </div>
                </div>
            </div>
        );
    }
}
