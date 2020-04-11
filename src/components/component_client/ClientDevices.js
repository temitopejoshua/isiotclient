import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import GoogleApiWrapper from './Map'
import SideNav from './SideNav';
import UploadDevice from '../component_admin/UploadDevice';


export default class ClientDevices extends React.Component {
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

            if(this.state.devices.length < 1)
                this.setState({deviceIsEmpty:true})

                else{
                    this.setState({deviceIsEmpty:false})
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
                        <Link to={"/device/" + device.devEui}>view</Link> 
                    </tr>
            )
            if (sessionStorage.getItem("isAuthenticated") !== 'true') {

                return <Redirect to="/login" />
            }

            else {
                return (
                    <div>
                        <div class="">
                            <SideNav/>
                        </div>
                        <div class="main">
                        <div class="">
                            <div className="card flex-fill w-100">
                                <h4 className="card-header">Locations</h4>
                                <div className="card-body p-2"></div>
                                <div style={{height: "400px"}}>
                                <GoogleApiWrapper/>
                                </div>
                            </div>
                            <div>
                            <div>
                                <UploadDevice/>
                            </div>
                            <div className="card flex-fill w-100">
                                <h4 className="card-header">Device Table</h4>
                                <div className="card-body">
                                <div hidden={!this.state.deviceIsEmpty} class="deviceTable">
                                <table class="table table-bordered">
                                    <thead class="table tableHead">
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
                                </div>
                                </div>
                                <h3 hidden={this.state.deviceIsEmpty}>You don't have any devices Yet!</h3>
                            </div>
                        </div>
                        </div>
                    </div>
                );
            }
        }
    }