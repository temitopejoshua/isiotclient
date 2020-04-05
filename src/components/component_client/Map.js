import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React from 'react';
import styles from './client_style.css'

class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            stores: [{ lat: 47.49855629475769, lng: -122.14184416996333 },
            ]

        }
    }


    displayMarkers = () => {



        this.state.stores.map((store, index) => 


            <div> <Marker key={index} id={index} position={{
                lat: store.latitude,
                lng: store.longitude
            }}

                onClick={() => console.log("You clicked me!")} />
                </div>


        )
    }


    render() {


        const dt =  this.state.stores.map((store, index) => 


        <div> <Marker key={index} id={index} position={{
            lat: store.latitude,
            lng: store.longitude
        }}

            onClick={() => console.log("You clicked me!")} />
            </div>


    )
        return (
            <div class="map-a">
                <h6>Location</h6>
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176 }}
            >
                {dt}
                <Marker position={{ lat: 48.00, lng: -122.00}}  onClick={() => console.log("You clicked me")} onHover={() =>console.log("You Hover me")}/>
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
