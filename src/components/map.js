import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

const mapStyles={
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component{

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
        const {loading, userLocation} = this.state;
        const {google} = this.props;

        if (loading){
            return null;
        }
        return(
            <Map google={google}
                initialCenter={userLocation}
                styles={mapStyles}
                zoom={16}
            >
            <Marker/>
            </Map>
        );
    }
}


export default GoogleApiWrapper({
    apiKey:'AIzaSyAsNfHrXa6btGOb7L6Pz5mW-WaUkz8Swq8&libraries=geometry,drawing,places'
})(MapContainer);
