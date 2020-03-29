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
    fetch('http://localhost:8081/api/users/' + params.id,
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
        <h1> {this.state.user.firstName} </h1>
        <h1> {this.state.user.lastName} </h1>
        <h1> {this.state.user.phoneNumber} </h1>
      </div>
    );
  }
}
// Params should always be there...
// UserDetail.propTypes = {
//   params: PropTypes.object.isRequired,
// };
