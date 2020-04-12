import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import SideNav from './Sidenav';

const mapStyles={
    width: '50%',
    height: '50%'
};

export class MapPage extends Component{

    state ={
        userLocation: {lat: 6.465422,lng: 3.406448 },
        loading: true
    };
    componentDidMount(props){
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;

                this.setState({
                    userLocation: { lat: latitude, lng: longitude },
                    loading: false
                });
            },
            () => {
                this.setState({loading: false});
            }
        );
    }
    render(){
        const {userLocation} = this.state;
        const {google} = this.props;

        return(
            <div className="wrapper">
                <div>
                    <SideNav/>
                </div>
            <div className="row main">
                <div className="col-12 col-lg-12 d-flex">
                <div className="card flex-fill w-100">
                <h4 className="card-header">Locations</h4>
                    <div className="card-body p-2"></div>
                    <div style={{height: "500px"}}>
                    <Map google={google}
                    initialCenter={userLocation}
                    zoom={16}
                    styles={mapStyles}
                    >
                    <Marker/>
                     </Map>
                     </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey:'AIzaSyAsNfHrXa6btGOb7L6Pz5mW-WaUkz8Swq8&libraries=geometry,drawing,places'
})(MapPage);
