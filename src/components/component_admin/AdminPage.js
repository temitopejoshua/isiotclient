import React, {Component} from 'react';
import Clients from './ClientList';
import Devices from './Devices';
import GraphCard from './Card';
import BarGraph from './BarGraph';
import MapContainer from './map';
import AdminTopNavBar from './TopNavbar';
import SideNav from './Sidenav'; 
import Footer from './footer';
import { Redirect } from 'react-router-dom';



export default class AdminPage extends Component{
    
    render(){

        if (sessionStorage.getItem("isAdmin") !== 'true') {
            return <Redirect to="/admin/login"/>
        }

        else {
        return(

            <div className="wrapper">
                <div>
                    <SideNav/>
                </div>
                <div className="main">
                    <div>
                        <AdminTopNavBar/>
                    </div>
                    <div className="div_margin"> 
                        <GraphCard/>
                    </div>
                    <div className="div_margin"> 
                        <BarGraph/>
                    </div>
                    <div className="row div_margin">
                        <div className="col-lg-6"> <Clients/></div>
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
}
