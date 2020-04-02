import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import styles from './client_style.css'

import GoogleApiWrapper from './Map'




export default class ClientHome extends React.Component {



    constructor(props) {

        super(props)
        this.state = {
            client: {},
            devices: [],
            deviceIsEmpty: false,
        }
    }

    fetchUsers = () => {
        // Read the token from the session storage
        // and include it to Authorization header
        const token = window.sessionStorage.getItem("jwt");

        fetch('http://localhost:8081/api/clients/access',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    client: responseData,
                    devices: responseData.devices
                });
            })
            .catch(err => console.error(err));
    }

    checkDevices = () => {

        if (this.state.devices.length < 1)
            this.setState({ deviceIsEmpty: true })

        else {
            this.setState({ deviceIsEmpty: false })
        }
    }

    componentDidMount() {

        this.fetchUsers()
        this.checkDevices()


    }

    render() {

        var i = 1;
        var id = this.state.client.id
        const tableRows = this.state.devices.map(

            (device, index) =>
                <tr key={index}>


                    <td>{i++}</td>
                    <td>{device.name}</td>
                    <td>{device.category.name}</td>
                    <div>
                        <Link to={"/device/" + device.devEui}>view </Link> /
                             <Link to={"/device/" + device.devEui}>delete</Link>

                    </div>





                </tr>)



        if (sessionStorage.getItem("isAuthenticated") !== 'true') {

            return <Redirect to="/login" />
        }


        else {
            return (


                <div>
                    <div class="sidenav">
                        <Link to="/home" style={{ color: 'blue' }}>Home</Link>
                        <Link to={"/profile"}>Profile</Link>
                        <Link to={"/client/devices"}>Devices</Link>
                    </div>

                    <div class="main">
                        <div class="col-12 otherSec">
                            <div>
                                <div class="row">
                                    <div class="col-2 cardB">
                                        <i class="fab fa-ethereum homeIcon"></i>
                                        <h5 class="card-title">Others</h5>

                                        <p class="card-text">{this.state.client.numberOfDevices}</p>


                                    </div>

                                    <div class="col-3 cardB">

                                        <i class="fas fa-thermometer homeIcon"></i>
                                        <h5 class="card-title">Temperature Sensor</h5>
                                        <p class="card-text">{this.state.client.numberOfDevices}</p>

                                    </div>
                                    <div class="col-3 cardB">
                                        <i class="fas fa-mobile-alt homeIcon"></i>
                                        <h5 class="card-title">Devices</h5>
                                        <p class="card-text">{this.state.client.numberOfDevices}</p>
                                    </div>
                                    <div class="col-3 cardB">
                                        <i class="fas fa-map-marker-alt col homeIcon"></i>

                                        <h5 class="card-title">Geolocation Sensor</h5>
                                        <p class="card-text">{this.state.client.numberOfDevices}</p>

                                    </div>



                                </div>


                            </div>
                            <div class="row">
                                <h5>Welcome {this.state.client.name}!</h5>

                            </div>


                            <div class="row">
                                <GoogleApiWrapper />
                            </div>


                            <div hidden={!this.state.deviceIsEmpty} class="row deviceTable">
                                <table class="table table-bordered">
                                    <thead class="table-info tableHead">
                                        <tr>
                                            <th scope="col">S/N</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Device Type</th>
                                            <th scope="col">Action</th>


                                        </tr>
                                    </thead>

                                    <tbody>{tableRows}</tbody>
                                </table>
                            </div>

                            <h3 hidden={this.state.deviceIsEmpty}>You don't have any devices Yet!</h3>
                        </div>
                    </div>
                </div>

            );

        }
    }


}







