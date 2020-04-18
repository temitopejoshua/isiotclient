import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import SideNav from './Sidenav';
import {Redirect} from 'react-router-dom';
import MapContainer from './map';


export class MapPage extends Component{

    render(){

        if (sessionStorage.getItem("isAdmin") !== 'true') {
            return <Redirect to="/admin/login" />
        }else{

        return(
            <div className="wrapper">
                <div>
                    <SideNav/>
                </div>
                
            <div className="main">
                <div className="div_margin"> 
                        <MapContainer/>
                    </div>
            </div>
            </div>
        );
    }
}
}
