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

                    <div class="col-md-12">
                        <div class="vh-100">
                            <div class="row">


                                <div class="col-md-12 mt-3">
                                    <div class="card round-small card-default">
                                        <div class="card-body p-5">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="pic">
                                                        <img src="images/dummyprofile.jpg"></img>
                                                    </div>
                                                </div>
                                                <div class="col-md-9">
                                                    <h1 class="mb-5">{this.state.client.name}</h1>

                                                    <p><i class="fas fa-envelope"></i> &nbsp; {this.state.client.emailAddress}</p>
                                                    <p><i class="fas fa-mobile"></i> &nbsp; {this.state.client.phoneNumber}</p>
                                                    <p><i class="fas fa-map-marker-alt"></i> &nbsp; {this.state.client.address}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="row row-eq-height">
                                        <div class="col-md-3 mt-3">
                                            <div class="card eqh round-small default">
                                                <div class="card-body text-center">

                                                    <h2 class=" bigicon mb-3"> {this.state.client.numberOfDevices} </h2>
                                                    <p>Number of devices</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-3 mt-3 action">
                                            <EditFields fetchData={this.fetchData} handleEdit={this.handleEdit} data={this.state.client} />
                                        </div>         

                                        <div class="col-md-3 mt-3 action">
                                            
                                                    <ChangePassword fetchData={this.fetchData} handleEdit={this.handleEdit} data={this.state.client} />
                        
                                            
                                        </div>

                                        <a href="/logout" class="col-md-3 mt-3 action">
                                            <div class="card eqh round-small card-default">
                                                <div class="card-body text-center">
                                                    <i class="fas fa-sign-out-alt bigicon mb-3"></i>
                                                    <p>Log out</p>
                                                </div>
                                            </div>
                                        </a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );

    }
}

