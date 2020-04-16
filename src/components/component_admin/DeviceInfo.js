import React, { Component } from 'react';
import {Redirect } from 'react-router-dom';
import EditDeviceFields from './EditProfile/EditDeviceFields';
import SideNav from './Sidenav'; 
import { Button } from 'react-bootstrap';
import DeviceMap from './DeviceMap';


export default class DeviceInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      device: {},
      category: {},
      userLocation: {
        lat: 6.465422,
        lng: 3.406448 },
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

upload = (data) =>{
  const url = "http://localhost:8081/api/clients/assigndevice" + this.state.device.id
  fetch(url,
  {
      crossDomain: true,
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  })
  .then((response) => {
      if (response.status === 201) {
          this.setState({
              isUploaded: true,
          })
      }
      else{
          this.setState({errs:this.state.devEui+ "\n device eui already exists"})
      }
  })
  .catch((error) => {
      console.error(error);
      this.setState({errs:error.toString()})
  });
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
            device: responseData,
            category: responseData.category,
          });
          console.log("Fetched Successfully " + responseData.name)
      })
  console.log("This is the id ")
}

componentWillMount(){
  this.fetchData();
}


componentDidMount(props){
  navigator.geolocation.getCurrentPosition(
      position => {
          const { latitude, longitude } = position.coords;

          this.setState({
              userLocation: { lat: latitude, lng: longitude },
              loading: false
          });
      },
      () => {
          this.setState({loading: false});
      }
  );
}
  

  render() {
    if (sessionStorage.getItem("isAdmin") !== 'true') {
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
        <h4 className="card-header">Device</h4>
          <div className="card-body">
          <div className="form-row">
            <div className="col col-sm-6">
              <h4>Device Management</h4>
            </div>
          <div className="col-lg-3 col-sm-3" >
            <EditDeviceFields 
            fetchData={this.fetchData}
            handleEdit={this.handleEdit}
            data={this.state.device}
            />
            </div>
            </div>
          <hr/>
          <div class="form-row">
              <div class="form-group col-md-6">
                  <label for="">Device Name</label>
                  <input type='text' class="form-control" defaultValue={this.state.device.name} ></input>
              </div>
              <div class="form-group col-md-6">
                  <label htmlFor="">Device EUI</label>
                  <input type='text' class="form-control" defaultValue={this.state.device.devEui}></input>
              </div>
              <div class="form-group col-md-6">
                  <label for="">Application EUI</label>
                  <input type='text' class="form-control" defaultValue={this.state.device.app_eui} readOnly></input>
              </div>
              <div class="form-group col-md-6">
                  <label htmlFor="">Tag</label>
                  <input type='text' class="form-control" defaultValue={this.state.device.tags}></input>
              </div>
          </div>

          <h4>Security</h4><hr/>
          <div class="form-row">
              <div class="form-group col-md-6">
                  <label for="">Application Key</label>
                  <input type='text' class="form-control" defaultValue={this.state.device.app_key} ></input>
              </div>
              <div class="form-group col-md-6">
                  <label htmlFor="">Device Address</label>
                  <input type='text' class="form-control" defaultValue={this.state.device.dev_addr} readOnly></input>
              </div>
          </div>

          <div class="form-row">
              <div class="form-group col-md-6">
                  <label for="">Network Session Key</label>
                  <input type='text' class="form-control" defaultValue={this.state.device.nwkskey} readOnly></input>
              </div>
              <div class="form-group col-md-6">
                  <label for="">Application Session Key</label>
                  <input type='text' class="form-control" defaultValue={this.state.device.appskey} readOnly></input>
              </div>
          </div>

          <h4>Radio</h4><hr/>
          <div class="form-row">
              <div class="form-group col-md-6">
                  <label for="">Last Update</label>
                  <input type='text' class="form-control" defaultValue={this.state.device.updatedDate} readOnly></input>
              </div>
              <div class="form-group col-md-6">
                  <label htmlFor="">Band</label>
                  <input type='text' class="form-control" defaultValue={this.state.device.band} ></input>
              </div>
          </div>

          <h4>LORA</h4><hr/>
          <div class="form-row">
              <div class="form-group col-md-6">
                  <label for="">Device Class</label>
                  <input type='text' class="form-control" defaultValue={this.state.device.device_class}></input>
              </div>
              <div class="form-group col-md-6">
                  <label htmlFor="">Counter Size</label>
                  <input type='text' class="form-control" defaultValue={this.state.device.counters_size} readOnly></input>
              </div>
          </div>
          
          <div class="form-row">
          
              <div class="form-group col-md-6">
                  <label for="">Category</label>
                  <input type='text' class="form-control" defaultValue={this.state.category.name} readOnly></input>
              </div>
              <div class="form-group col-md-6">
                  <label for="">Assigned</label>
                  <h5>{this.state.device.assigned? greenButton:redButton}</h5>
              </div>
          </div>
          <div className="div_margin">
              <DeviceMap
              />
          </div>      
          </div>
          </div>
      </div>
      </div>
    );
  }
}

