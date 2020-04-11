import React, { Component } from 'react';
import SideNav from './component_admin/Sidenav';
import {Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export default class UserDetail extends Component {

  constructor(props) {

    super(props)
    this.state = {
      user: {},
      devices: [],
      numberOfDevices: 0
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
          user: responseData,
          devices: responseData.devices,
          numberOfDevices: responseData.devices.length
        });
        console.log("Fetched Successfully " + responseData.firstName + this.state.user.firstName)
      })
    console.log("This is the id " + params.id)
  }
  render() {
    if (sessionStorage.getItem("isAuthenticated") !== 'true') {
      return <Redirect to="/admin/login" />
    }

    const redButton = <Button className="btn btn-danger"></Button>
    const greenButton = <Button className="btn btn-success"></Button>


    return (
      <div>
      <div>
        <SideNav/>
      </div>
      <div className="main">
      <div className="card flex-fill w-100">
        <h4 className="card-header">User Information(IS Database)</h4>
          <div className="card-body">
          <div className="form-group row">
                  <label htmlFor="" className="col-lg-2 col-sm-3 col-form-label">Name</label>
                  <div class="col-lg-4 col-sm-9">
                  <input type='text' class="form-control" placeholder={this.state.user.name} readOnly></input>
              </div>
          </div>
          <div className="form-group row">
                  <label htmlFor="" className="col-lg-2 col-sm-3 col-form-label">Email Address</label>
                  <div class="col-lg-4 col-sm-9">
                  <input type='text' class="form-control"  placeholder={this.state.user.emailAddress} readOnly></input>
              </div>
          </div>

          <div className="form-group row">
                  <label htmlFor="" className="col-lg-2 col-sm-3 col-form-label">Phone Number</label>
                  <div class="col-lg-4 col-sm-9">
                  <input type='text' class="form-control"  placeholder={this.state.user.phoneNumber} readOnly></input>
              </div>
          </div>

          <div className="form-group row">
                  <label htmlFor="" className="col-lg-2 col-sm-3 col-form-label">Address</label>
                  <div class="col-lg-4 col-sm-9">
                  <textarea type='text' class="form-control" placeholder={this.state.user.address} readOnly></textarea>
              </div>
          </div>

          <div className="form-group row">
                  <label htmlFor="" className="col-lg-2 col-sm-3 col-form-label">Assigned Devices</label>
                  <div class="col-lg-4 col-sm-9">
                  <input type='text' class="form-control" placeholder={this.state.numberOfDevices} readOnly></input>
              </div>
          </div>

          <div className="form-group row">
                  <label htmlFor="" className="col-lg-2 col-sm-3 col-form-label">Active</label>
                  <div class="col-lg-4 col-sm-9">
                  {this.state.user.active? greenButton : redButton}
              </div>
          </div>

          <div className="form-group row">
                  <label htmlFor="" className="col-lg-2 col-sm-3 col-form-label">Last Login</label>
                  <div class="col-lg-4 col-sm-9">
                  <input type='text' class="form-control" placeholder={this.state.user.lastLogIn} readOnly></input>
              </div>
          </div>

          <div className="form-group row">
                  <label htmlFor="" className="col-lg-2 col-sm-3 col-form-label">Created Date</label>
                  <div class="col-lg-4 col-sm-9">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.user.createdAt} readOnly></input>
              </div>
          </div>
          </div>
          </div>
      </div>
      </div>
    );
  }
}

