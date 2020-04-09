import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import EditEmail from './component_edit.js/EditEmail'
import EditFields from './component_edit.js/EditFields'
import { Redirect } from 'react-router-dom'
import ChangePassword from './component_edit.js/ChangePassword'
import './client_style.css'


import SideNav from './SideNav';


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

    render(){
    const user = window.sessionStorage.getItem("user");
         var id = this.state.client.id
         if (sessionStorage.getItem("isAuthenticated") !== 'true') {
             return <Redirect to="/login" />
         }

    return(
        <div className="wrapper">
            <div>
            <SideNav/>
            </div>
            <div className="main">
                <div className="container-fluid">
                    <h2>User Profile</h2>
                    <div className="row ">
                        <div className="col-md-4 col-lg-3 profile_card">
                            <div className="card mb-3">
                                <div className="card-body text-center">
                                    <div className="sidebar-user">
                                        <div className="user-image"><i class="fas fa-user"></i></div>                                        
                                        <div className="font-weight-bold">Welcome {this.state.client.name}</div>
                                        <small>IOT Client</small>
                                    </div>
                                </div>
                                <hr/>
                                <div className="card">
                                <div className="card-header">Recent</div></div>
                                <div className="card-body">
                                    <h5>Tasks</h5>
                                    <h5>Notifications</h5>
                                </div>
                            </div>
                        </div>

                    
                        <div className="col-lg-9">
                            <div className="card profile_card">
                                <div className="card-header">
                                    <h5 className="card-title">Profile Details</h5>
                                </div>
                                <div className="card-body h-100">
                                    <div className="row row_card">
                                        <div className="col-6">
                                            <h6 className="font-weight-bold"><i class="fas fa-envelope-square icon" ></i>Email Address</h6>
                                            <hr/>
                                            <h6>{this.state.client.emailAddress}</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="font-weight-bold"><i class="fas fa-map-marker-alt icon"></i>Address</h6>
                                            <hr/>
                                            <h6>{this.state.client.address}</h6>
                                        </div>
                                    </div>
                                    <div className="row row_card">
                                        <div className="col-6">
                                            <h6 className="font-weight-bold"> <i class="fas fa-mobile icon"></i>Phone Number</h6>
                                            
                                            <hr/>
                                            <h6>{this.state.client.phoneNumber}</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="font-weight-bold"><i class="fas fa-sort-numeric-up icon"></i>Number Of Devices</h6>
                                            <hr/>
                                            <h6>{this.state.client.numberOfDevices}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card profile_card">
                                <div className="card-header">
                                <h5 className="card-title">Edit Information</h5>
                                </div>
                                <div className="card-body h-100">
                                <div className="row row_card">
                                <div className="col-3">
                                        <h6 className="font-weight-bold">
                                            <ChangePassword fetchData={this.fetchData} handleEdit={this.handleEdit} data={this.state.client} />
                                            Change Password</h6>
                                        </div>
                                        <div className="col-3">
                                            <h6 className="text-center">
                                            <a href="/logout"><i class="fas fa-sign-out-alt icon"></i></a>
                                            <h6 className="font-weight-bold ">Logout</h6></h6>
                                        </div>
                                        <div className="col-3 profileIcon">
                                            <h6 className="font-weight-bold text-center">
                                            <EditFields fetchData={this.fetchData} handleEdit={this.handleEdit} data={this.state.client} />
                                            Edit Profile</h6>
                                        </div>
                                        <div className="col-3 profileIcon">
                                            <h6 className="font-weight-bold">
                                            <i class="fas fa-angle-double-right icon"></i>
                                            <h6 className="font-weight-bold ">{this.state.client.active ? "Active" : "Suspended"}</h6></h6>
                                        </div>
                                    </div>
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


