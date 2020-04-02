import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import DeviceChart from './deviceChart';
import MapContainer from './map'; 
import './Admin.css';

import user from './user.png'
import settings from './settings.png'
import devices from './devices.png'
import temperature from './temperature.png'
import geolocation from './location.png'


import axios from 'axios';



export default class Card extends Component{
  constructor(props){
    super(props);
    this.state = {

      currentTime: '',
      numberOfDevices: 0,
      numberOfClients: 0,
      numberOfTempSensor: 0,
      numberOfGeoSensor: 0,
    };
  }

fetchDevices = () => {
  // Read the token from the session storage
  // and include it to Authorization header
  const token = window.sessionStorage.getItem("jwt");
  fetch('http://localhost:8081/api/devices',
      {
          headers: { 'Authorization': token }
      })
      .then((response) => response.json())
      .then((responseData) => {
          this.setState({
              numberOfDevices: responseData.page.totalElements,
          });
      })
      .catch(err => console.error(err));
}


fetchClients = () => {
  // Read the token from the session storage
  // and include it to Authorization header
  const token = window.sessionStorage.getItem("jwt");
  fetch('http://localhost:8081/api/clients',
      {
          headers: { 'Authorization': token }
      })
      .then((response) => response.json())
      .then((responseData) => {
          this.setState({
              numberOfClients: responseData.page.totalElements,
          });
      })
      .catch(err => console.error(err));
}




    getTime =() =>{
      var hours = new Date().getHours();
      var mins = new Date().getMinutes();
      var time = hours + '/' + mins
      this.setState({ currentMinute: time })
        }

    
        componentDidMount() {
          this.fetchDevices();
          this.fetchClients();
          this.getTime();
            
        }

    render(){
        return(
            <div>
            <div className="row">


                <div className="col-12 col-md-6 col-xl d-flex">
                  <div className="card flex-fill">
                    <div className="card-body py-4">
                      <div className="row">
                        <div className="col-8">
                          <h3 className="mb-2">{this.state.numberOfClients}</h3>
                          <div className="mb-0">Clients</div>
                        </div>
                        <div className="col-4 ml-auto text-right">
                          <div className="d-inline-block mt-2">
                          <img src={user} style={{ height: "50px", width: "50px", color: "red"}}/>
                        </div>
                        </div>
                      </div>
                      </div>
                      <div className="card-footer">
                      <small className="text-muted">Last updated {this.state.currentMinute} mins ago</small>
                      </div>
                  </div>
                </div>


                <div className="col-12 col-md-6 col-xl d-flex">
                  <div className="card flex-fill">
                    <div className="card-body py-4">
                      <div className="row">
                        <div className="col-8">
                          <h3 className="mb-2">{this.state.numberOfTempSensor}</h3>
                          <div className="mb-0">Temperature Sensor</div>
                        </div>
                        <div className="col-4 ml-auto text-right">
                          <div className="d-inline-block mt-2">
                          <img src={temperature} style={{height: "50px", width: "50px", color: "red"}}/>
                        </div>
                        </div>
                      </div>
                      </div>
                      <div className="card-footer">
                      <small className="text-muted">Last updated {this.state.currentMinute} mins ago</small>
                      </div>
                  </div>
                </div>


                <div className="col-12 col-md-6 col-xl d-flex">
                  <div className="card flex-fill">
                    <div className="card-body py-4">
                      <div className="row">
                        <div className="col-8">
                          <h3 className="mb-2">{this.state.numberOfGeoSensor}</h3>
                          <div className="mb-0">Temperature Sensor</div>
                        </div>
                        <div className="col-4 ml-auto text-right">
                          <div className="d-inline-block mt-2">
                          <img src={geolocation} style={{height: "50px", width: "50px", color: "red"}}/>
                        </div>
                        </div>
                      </div>
                      </div>
                      <div className="card-footer">
                      <small className="text-muted">Last updated {this.state.currentMinute} mins ago</small>
                      </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-xl d-flex">
                  <div className="card flex-fill">
                    <div className="card-body py-4">
                      <div className="row">
                        <div className="col-8">
                          <h3 className="mb-2">{this.state.numberOfDevices}</h3>
                          <div className="mb-0">Temperature Sensor</div>
                        </div>
                        <div className="col-4 ml-auto text-right">
                          <div className="d-inline-block mt-2">
                          <img src={devices} style={{height: "50px", width: "50px", color: "red"}}/>
                        </div>
                        </div>
                      </div>
                      </div>
                      <div className="card-footer">
                      <small className="text-muted">Last updated {this.state.currentMinute} mins ago</small>
                      </div>
                  </div>
                </div>

            </div>
            </div>
        );
    }
}






// <div className="col-12 col-md-6 col-xl d-flex">
//                   <div className="card flex-fill">
//                     <div className="card-body py-4">
//                       <div className="row">
//                         <div className="col-8">
//                           <h3 className="mb-2">{this.state.numberOfClients}</h3>
//                           <div className="mb-0">Clients</div>
//                         </div>
//                         <div className="col-4 ml-auto text-right">
//                           <div className="d-inline-block mt-2">
//                           <img src={user} style={{ height: "8rem", color: "red"}}/>
//                         </div>
//                         </div>
//                       </div>
//                       </div>
//                       <div className="card-footer">
//                       <small className="text-muted">Last updated {this.state.currentMinute} mins ago</small>
//                       </div>
//                   </div>
//                 </div>


//                 <div className="col-lg-3 mb-3 grid-margin">
//                   <div className="card h-100">
//                       {/* <h5 className="card-header icon">Temperature Sensor</h5> */}
//                       <div className="card-body icon row">
//                         <img src={temperature} style={{ height: "8rem", color: "red"}}/>
//                         {/* <h1 className="icon">Temperature Sensor</h1><br/> */}
//                         <h1>{this.state.numberOfTempSensor}</h1>
//                       </div>
//                       <div className="card-footer">
//                       <small className="text-muted">Last updated {this.state.currentMinute} mins ago</small>
//                       </div>
//                   </div>
//                 </div>

//                 <div className="col-lg-3 mb-3 grid-margin">
//                   <div className="card h-100">
//                       {/* <h5 className="card-header icon">Geolocation Sensor</h5> */}
//                       <div className="card-body icon row">
//                         <img src={geolocation} style={{ height: "8rem", color: "red"}}/>
//                         <h1>{this.state.numberOfGeoSensor}</h1>
//                       </div>
//                       <div className="card-footer">
//                       <small className="text-muted">Last updated {this.state.currentMinute} mins ago</small>
//                       </div>
//                   </div>
//                 </div>

//                 <div className="col-lg-3 mb-3 grid-margin">
//                   <div className="card h-100">
//                       {/* <h5 className="card-header icon">Devices</h5> */}
//                       <div className="card-body icon row">
//                         <img src={devices} style={{ height: "8rem", color: "red"}}/>
//                         <h1>{this.state.numberOfDevices}</h1>
//                       </div>
//                       <div className="card-footer">
//                       <small className="text-muted">Last updated {this.state.currentMinute} mins ago</small>
//                       </div>
//                   </div>
//                 </div>
//             </div>
//             </div>