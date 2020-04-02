import React, { Component } from 'react';
import {Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'


export default class Device extends Component {


  constructor(props) {

    super(props)
    this.state = {
      device: {},
    }
  }



  componentWillMount(props) {
    // The dynamic URL segment we're interested in, "id",
    // is stored in the "params" property.

    const { match: { params } } = this.props;

    const token = window.sessionStorage.getItem("jwt");
    fetch('http://localhost:8081/api/devices/' + params.id,
      {
        headers: { 'Authorization': token }
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          device: responseData.device
        });
      })

    console.log("This is the id " + params.id)



  }


  render() {

    if (sessionStorage.getItem("isAuthenticated") !== 'true') {

        return <Redirect to="/login" />
    }


    return (

      <div>
        <h1>Activation: {this.state.device.activation} </h1>
        <h1>App Eui: {this.state.device.app_eui} </h1>
        <h1>Dev Eui: {this.state.device.dev_eui} </h1>
        <h1>Apps Key: {this.state.device.appskey} </h1>
        <h1>Band: {this.state.device.band} </h1>


      </div>
    );

  }
}

