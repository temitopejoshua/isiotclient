import React, { Component } from 'react';
import {Redirect } from 'react-router-dom'


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

      <div className="card flex-fill w-100">
        <h4 className="card-header">Device Information</h4>
          <div className="card-body  device-info">
          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Device Eui</label>
                  <div class="col-lg-8 col-sm-9">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.dev_eui} onChange={this.handleChange} required readOnly></input>
              </div>
          </div>

          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Activation</label>
                  <div class="col-lg-8 col-sm-9">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.activation} onChange={this.handleChange} required readOnly></input>
              </div>
          </div>

          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Application Eui</label>
                  <div class="col-lg-8 col-sm-9">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.app_eui} onChange={this.handleChange} required readOnly></input>
              </div>
          </div>

          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Applications Keys</label>
                  <div class="col-lg-8 col-sm-9">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.appskey} onChange={this.handleChange} required readOnly></input>
              </div>
          </div>

          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Band</label>
                  <div class="col-lg-8 col-sm-9">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.band} onChange={this.handleChange} required readOnly></input>
              </div>
          </div>
          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Device Class</label>
                  <div class="col-lg-8 col-sm-9 ">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.deviceClass} onChange={this.handleChange} required readOnly></input>
              </div>
          </div>
          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Date Created</label>
                  <div class="col-sm-9 col-lg-8 ">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.uploadedDate} onChange={this.handleChange} required readOnly></input>
              </div>
          </div>
          </div>
      </div>
    );
  }
}

