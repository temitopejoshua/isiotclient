import React, { Component } from 'react';


export default class UserDetail extends Component {

  constructor(props) {

    super(props)
    this.state = {
      user: {},
    }
  }
  componentWillMount(props) {
    // The dynamic URL segment we're interested in, "id",
    // is stored in the "params" property.

    const { match: { params } } = this.props;

    const token = window.sessionStorage.getItem("jwt");
    fetch('http://localhost:8081/api/clients/' + params.id,
      {
        headers: { 'Authorization': token }
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          user: responseData
        });
        console.log("Fetched Successfully " + responseData.firstName + this.state.user.firstName)
      })
    console.log("This is the id " + params.id)
  }
  render() {
    return (
      <div>
        <h1> {this.state.user.name} </h1>
        <h1> {this.state.user.emailAddress} </h1>
                <h1>{this.state.user.numberOfDevices}</h1>



      </div>
    );
  }
}

