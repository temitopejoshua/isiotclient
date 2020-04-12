import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import styles from './client_style.css'
import BounceLoader from 'react-spinners/BounceLoader'
import SideNav from './SideNav'

import GoogleApiWrapper from './Map'




export default class ClientHome extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            client: {},
            loading: true,
            devices: []
            
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
                    devices: responseData.devices,
                    loading: false
                });
            })
            .catch(err => console.error(err));
    }



    componentDidMount() {
        this.fetchUsers()
    }

    render() {

        const data = this.state.devices.slice(0, 5)
        const tableRows = data.map(

            (device, index) =>
                <tr key={index}>


                    <td></td>
                    <td>{device.name}</td>
                    <td>{device.category.name}</td>
                    <div>
                        <Link to={"/device/" + device.devEui}>View </Link>

                    </div>
                </tr>)

        if (sessionStorage.getItem("isAuthenticated") !== 'true') {
            return <Redirect to="/login" />
        }

        else {
            return (
                <div>
                    <div>
                        <SideNav />
                    </div>



                    <div class="main">

                        <div class="loaderTemp" hidden={!this.state.loading}>

                            <div>
                                <BounceLoader

                                    size={100}
                                    color={"grey"}
                                    loading={this.state.loading}

                                />
                            </div>

                        </div>

                        <div hidden={this.state.loading}>
                            <div class="col-12 otherSec">
                                <div>
                                    <div class="row no-border">


                                        <div class="col-md-3 mt-3">
                                            <div class="card card-default">
                                                <div class="card-body">
                                                    <i class="fas fa-mobile-alt homeIcon"></i>
                                                    <h5 class="card-title">Devices</h5>
                                                    <p class="card-text">{this.state.client.numberOfDevices}</p>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-md-3 mt-3">
                                            <div class="card card-default">
                                                <div class="card-body">
                                                    <i class="fas fa-thermometer homeIcon"></i>
                                                    <h5 class="card-title">Temperature Sensor</h5>
                                                    <p class="card-text">{this.state.client.numberOfDevices}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-3 mt-3">
                                            <div class="card card-default">
                                                <div class="card-body">
                                                    <i class="fas fa-map-marker-alt col homeIcon"></i>

                                                    <h5 class="card-title">Geolocation Sensor</h5>
                                                    <p class="card-text">{this.state.client.numberOfDevices}</p>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="col-md-3 mt-3">
                                            <div class="card card-default">
                                                <div class="card-body">
                                                    <i class="fab fa-ethereum homeIcon"></i>
                                                    <h5 class="card-title">Others</h5>

                                                    <p class="card-text">{this.state.client.numberOfDevices}</p>
                                                </div>

                                            </div>

                                        </div>



                                    </div>


                                </div>
                                <div class="row mt-3 mb-3">
                                    <div class="col-md-12">
                                        <h5>Welcome {this.state.client.name}!</h5>
                                    </div>

                                </div>


                                <div class="row">
                                    <div class="col-md-12 mb-5">
                                        <GoogleApiWrapper />
                                    </div>
                                </div>


                                <div class="row deviceTable">
                                    <div class="col-md-12">
                                        <table class="table table-bordered text-center serial">
                                            <thead class="tableHead">

                                                <th scope="col">S/N</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Device Type</th>
                                                <th scope="col">Action</th>



                                            </thead>

                                            <tbody>{tableRows}</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            );

        }
    }


}







