import React, { Component } from 'react';
import {Redirect } from 'react-router-dom';
import EditDeviceFields from './EditProfile/EditDeviceFields';


export default class DeviceInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      device: {},
    }
  }

  handleEdit = (data) => {
    const url = "http://localhost:8081/api/devices2/" + this.state.device.id
    fetch(url, {
        crossOrigin: true,
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response))
        .then(this.fetchData);

}

fetchData = () => {

  const { match: { params } } = this.props;
  const token = window.sessionStorage.getItem("jwt");
  fetch('http://localhost:8081/api/devices2/' + params.id,
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


componentWillMount(props) {
    // The dynamic URL segment we're interested in, "id",
    // is stored in the "params" property.
    const { match: { params } } = this.props;

    const token = window.sessionStorage.getItem("jwt");
    fetch('http://localhost:8081/api/devices2/' + params.id,
      {
        headers: { 'Authorization': token }
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          // device: responseData.device
          device: responseData
        });
      })
    console.log("This is the id " + params.id)
}
  

  render() {
    if (sessionStorage.getItem("isAuthenticated") !== 'true') {
        return <Redirect to="/admin/login" />
    }
    return (

      <div className="card flex-fill w-100">
        <h4 className="card-header">Device Information(IS Database)</h4>
          <div className="card-body  device-info">
          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Device Name</label>
                  <div class="col-lg-8 col-sm-9">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.name} readOnly></input>
              </div>
          </div>
          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Device Eui</label>
                  <div class="col-lg-8 col-sm-9">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.devEui} readOnly></input>
              </div>
          </div>

          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Activation</label>
                  <div class="col-lg-8 col-sm-9">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.activation} readOnly></input>
              </div>
          </div>

          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Application Eui</label>
                  <div class="col-lg-8 col-sm-9">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.app_eui} readOnly></input>
              </div>
          </div>

          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Applications Keys</label>
                  <div class="col-lg-8 col-sm-9">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.appskey} readOnly></input>
              </div>
          </div>

          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Band</label>
                  <div class="col-lg-8 col-sm-9">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.band} readOnly></input>
              </div>
          </div>
          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Device Class</label>
                  <div class="col-lg-8 col-sm-9 ">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.deviceClass} readOnly></input>
              </div>
          </div>
          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Device Category</label>
                  <div class="col-sm-9 col-lg-8 ">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.category} readOnly></input>
              </div>
          </div>
          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Last Updated</label>
                  <div class="col-sm-9 col-lg-8 ">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.uploadedDate} readOnly></input>
              </div>
          </div>
          <div className="form-group row">
                  <label htmlFor="" className="col-lg-4 col-sm-3 col-form-label">Date Created</label>
                  <div class="col-sm-9 col-lg-8 ">
                  <input type='text' class="form-control" name='app_key'  placeholder={this.state.device.uploadedDate} readOnly></input>
              </div>
          </div>
          <div className="form-group row" >
            <EditDeviceFields 
            fetchData={this.fetchData}
            handleEdit={this.handleEdit}
            data={this.state.device}
            />
          </div>
          </div>
      </div>
    );
  }
}

