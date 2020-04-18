import React, {Component} from 'react';
import SkyLight from 'react-skylight';
import { Redirect } from 'react-router-dom';


export default class AssignDevice extends Component{
    constructor(props){
        super(props)
        this.state={
            clients: [],
            devices: [],
            clientID: "",
            deviceID: 0,
            isDeviceAssigned: false,
        }
    }

    handleChange =(event) =>{
        console.log("in change")
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = () => {
        const token = window.sessionStorage.getItem("jwt");
        fetch("http://localhost:8081/api/clients/assigndevice?clientId="+this.state.clientID+"&deviceId="+ this.state.deviceID,
            {
                crossDomain: true,
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                if (!response.status === 201) {
                    this.setState({
                        error: 'Error',
                        isDeviceAssigned: false,
                    })
                }
                else{
                    this.setState({
                        isDeviceAssigned: true,
                    })
                    console.log("Assigned: "+ this.state.isDeviceAssigned)
                }
            })
            .catch((err) => {
                console.error(err);
            });

    }


    fetchClients = () => {
        const token = window.sessionStorage.getItem("jwt");
        fetch('http://localhost:8081/api/clients',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    clients: responseData._embedded.clients,
                });
            })
            .catch(err => console.error(err));
    }

    fetchDevices = () => {
        const token = window.sessionStorage.getItem("jwt");
        fetch('http://localhost:8081/api/devices',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {

                const allDevice = responseData._embedded.devices
                const unassigned = [];

                allDevice.forEach(device => {
                    if(!device.assigned){
                        unassigned.push(device);
                    }
                });
                this.setState({
                    devices: unassigned,
                });
                console.log(unassigned)
            })
            .catch(err => console.error(err));
    }
    

    componentDidMount(){
        this.fetchClients();
        this.fetchDevices();
    }

    render(){

        const clientOptions = this.state.clients.map((client, key) =>
                <option key={client.id} value={client.id}>
                    {client.name}
                </option>);

        const deviceOptions = this.state.devices.map((device, key) =>
                <option key={device.id} value={device.id}>
                    {device.name}
                </option>);

        if (sessionStorage.getItem("isAdmin") !== 'true') {
            return <Redirect to="/admin/login"/>
        }

        return(
            <div>
            <SkyLight hideOnOverlayClicked ref="addDialog" className="container">
                <div class="p-5">
                    <form class="form">
                        <div class="form-group">
                            <label htmlFor="">Select Client</label>
                            <select id="" class="form-control" type="text" name="clientID" onChange={this.handleChange} required>
                            <option>Choose ...</option>
                            {clientOptions}
                            </select>   
                        </div>

                        <div class="form-group">
                            <label htmlFor="">Select Device</label>
                            <select id="" class="form-control" type="number" name="deviceID" onChange={this.handleChange} required>
                            <option>Choose ...</option>
                            {deviceOptions}
                            </select>   
                        </div>

                        <button class="btn btn-danger" type="reset" onClick={this.handleReset}>Cancel</button>
                        <button type="Submit" class="btn btn-success  ml-3" onClick={this.handleSubmit}>Save</button>
                    </form>
                </div>
            </SkyLight>
            <button
                    onClick={() => this.refs.addDialog.show()} className="btn btn-primary mt-4">Assign Device
            </button>
        </div>
        );
    }
}