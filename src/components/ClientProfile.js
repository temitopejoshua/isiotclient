import React, { Component } from 'react';
import PropTypes from 'prop-types'
import '../style.css'
import { Link } from 'react-router-dom'



export default class Profile extends Component {


    constructor(props) {

        super(props)
        this.state = {
            user: {},
        }
    }



    componentWillMount(props) {



        const token = window.sessionStorage.getItem("jwt");
        fetch('http://localhost:8081/api/clients/access',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    user: responseData
                });

                console.log("Fetched Successfully " + responseData.name)


            })

        console.log("This is the id ")



    }


    render() {

        var id = this.state.user.id


        return (

            <div>
                <div class="sidenav">
                    <Link to="/home">Home</Link>
                    <Link to={"/profile"} style={{color:'blue'}}>Profile</Link>
                    <Link to={"/client/devices"}>Devices</Link>
                </div>
                <div class="main">
                    <div class="container-fluid" style={{backgroundColor:'white', width:'40%', marginLeft:'-8px', height:'670px'}}>
                    <p>Name:<h4>{this.state.user.name} </h4> </p>
                    <h4>Email Address: {this.state.user.emailAddress} </h4>
                    <h4>Number Of Devices:{this.state.user.numberOfDevices}</h4>
                    <p>Phone Number: {this.state.user.phoneNumber}</p>
                    <p>Date Joined: {this.state.user.dateJoined}</p>
                    <p>Id:{this.state.user.id}</p>
                    <p>Last Login:{this.state.user.lastLogin}</p>
                    <p>Is Active:{this.state.user.active}</p>

                    </div>

                </div>

            </div>
        );

    }
}


