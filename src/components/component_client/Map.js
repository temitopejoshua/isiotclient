import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React from 'react';
import styles from './client_style.css'

export class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            devices: []


        }
    }

 
    displayMarkers = () => { 

        return this.props.location.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.latitude,
                lng: store.longitude
            }}
                title={"Hello Internet Solutions"} />
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
