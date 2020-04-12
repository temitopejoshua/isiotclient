import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React from 'react';
import styles from './client_style.css'

class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stores: [
            { latitude: 47.359423, longitude: -122.021071 },
            { latitude: 47.2052192687988, longitude: -121.988426208496 },
            { latitude: 47.6307081, longitude: -122.1434325 },
            { latitude: 47.3084488, longitude: -122.2140121 },
            { latitude: 47.5524695, longitude: -122.0425407 }],


        }
    }

    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.latitude,
                lng: store.longitude
            }}
                title={"Hi ISN"} />
        })
    }


    render() {


        return (
            <div class="map-a">
                <h6>Location</h6>
                <Map
                    google={this.props.google}
                    zoom={8}
                    style={mapStyles}
                    initialCenter={{ lat: 47.444, lng: -122.176 }}
                >


                    {this.displayMarkers()}



                </Map>


                






            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAsNfHrXa6btGOb7L6Pz5mW-WaUkz8Swq8'
})(MapContainer);

const mapStyles = {
    width: '96%',
    height: '400px',
    position: 'relative',
};
