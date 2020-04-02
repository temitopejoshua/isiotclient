import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import EditEmail from './component_edit.js/EditEmail'
import EditFields from './component_edit.js/EditFields'
import { Redirect } from 'react-router-dom'
import ChangePassword from './component_edit.js/ChangePassword'
import styles from './client_style.css'






export default class Profile extends Component {


    constructor(props) {

        super(props)
        this.state = {
            client: {},
        }
    }


    handleEdit = (data) => {

        const url = "http://localhost:8081/api/clients/" + this.state.client.id

        fetch(url, {
            crossOrigin: true,
            method: 'PUT', // or ‘PUT’
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response))
            .then(this.fetchData);

    }

    fetchData = () => {

        const token = window.sessionStorage.getItem("jwt");
        fetch('http://localhost:8081/api/clients/access',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    client: responseData
                });

                console.log("Fetched Successfully " + responseData.name)


            })

        console.log("This is the id ")

    }

    componentWillMount(props) {


        this.fetchData()




    }


    render() {

        var id = this.state.client.id

        if (sessionStorage.getItem("isAuthenticated") !== 'true') {

            return <Redirect to="/login" />
        }


        return (

            <div>
                <div class="sidenav">
                    <Link to="/home">Home</Link>
                    <Link to={"/profile"} style={{ color: 'blue' }}>Profile</Link>
                    <Link to={"/client/devices"}>Devices</Link>
                </div>
                <div class="main">
                    <div class="row" style={{ height: '100vh', }}>

                        <div class=" col-3" style={{ backgroundColor: 'white', marginLeft: '20px', borderRadius: '10px', padding: '30px' }}>
                            <div style={{ color: 'blue', fontSize: '300px', padding: '20px' }}>
                                <i class="fas fa-user" style={{ marginLeft: "-40px" }}></i>
                                <h3 class="">Welcome!</h3>
                                <h1>{this.state.client.name}</h1>
                            </div>

                        </div>
                        <div class=" col-8">

                            <div class="row customProfile">
                                <div class="profileIcon">
                                    <i class="fas fa-envelope-square col icon" ></i>
                                    <h4>{this.state.client.emailAddress}</h4>

                                </div>

                                <div class="profileIcon" >
                                    <i class="fas fa-map-marker-alt col icon"></i>
                                    <h4>{this.state.client.address}</h4>

                                </div>
                                <div class="profileIcon">
                                    <i class="fas fa-mobile icon"></i>
                                    <h4>{this.state.client.phoneNumber}</h4>
                                </div>
                                <div class="profileIcon">
                                    <i class="fas fa-sort-numeric-up col icon"></i>
                                    <h4>Number of Devices: {this.state.client.numberOfDevices}</h4>


                                </div>


                            </div>

                            <div class="row customProfile2">

                                <div class="profileIcon">
                                    <ChangePassword fetchData={this.fetchData} handleEdit={this.handleEdit} data={this.state.client} />
                                    <h4>Change Password</h4>

                                </div>

                                <div class="profileIcon">
                                    <a href="/logout"
                                    ><i class="fas fa-sign-out-alt icon"></i>
                                    </a>
                                    <h4>Logout</h4>


                                </div>

                                <div class="profileIcon">
                                    <EditFields fetchData={this.fetchData} handleEdit={this.handleEdit} data={this.state.client} />
                                    <h4>Edit Profile</h4>

                                </div>

                                <div class="profileIcon">
                                    <i class="fas fa-angle-double-right icon"></i>
                                    <h4>{this.state.client.active ? "Active" : "Suspended"}</h4>

                                </div>

                               
                            </div>


                        </div>

                    </div>



                </div>

            </div>
        );

    }
}

