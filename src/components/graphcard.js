import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import DeviceChart from './deviceChart';
import MapContainer from './map'; 



export default class GraphCard extends Component{
    render(){
        return(
            <div className="">
            <div className="row mt-5">
                <div className="col-lg-4 mb-4 grid-margin">
                  <div className="card h-100">
                      <h4 className="card-header">Device Chart</h4>
                      <div className="card-body">
                        <DeviceChart/>
                      </div>
                      <div className="card-footer">
                        <Button variant="btn btn-danger">Upload Device</Button>
                      </div>
                  </div>
                </div>
                <div className="col-lg-4 mb-4 grid-margin">
                  <div className="card h-100">
                      <h4 className="card-header">Notification</h4>
                      <div className="card-body">
                      <MapContainer/>
                      </div>
                      <div className="card-footer">
                        <Button variant="btn btn-danger">View All</Button>
                      </div>
                  </div>
                </div>
                <div className="col-lg-4 mb-4 grid-margin">
                  <div className="card h-100">
                      <h4 className="card-header">Tasks</h4>
                      <div className="card-body">
                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque.</p>
                      </div>
                      <div className="card-footer">
                        <Button variant="btn btn-danger">View All</Button>
                      </div>
                  </div>
                </div>
            </div>
            </div>
        );
    }
}
