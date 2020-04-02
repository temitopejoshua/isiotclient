import React from 'react';
import { Link } from 'react-router-dom';
import './ClientList.css';



export default class Devices extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            devices: [],
            numberOfDevices:0,
            loading: true,
            devicesPerPage: 10,
            currentPage: 1,
        }
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
                    devices: responseData._embedded.devices,
                    loading: false,
                    numberOfDevices: responseData.page.totalElements,
                });
            })
            .catch(err => console.error(err));
    }
    componentDidMount() {
        this.fetchDevices()
    }
    render() {
        const {loading, numberOfDevices} = this.state;

        var row =1;

        const deviceData = this.state.devices.map(
            (device, index) =>
                <tr key={index}>
                    <td>{row++}</td>
                    <td>{device.count}</td>
                    <td>{device.app_eui}</td>
                    <td>{device.adr}</td>
                    <td>{device.delete}</td>
                    <td>UpdateSuspend</td>
                    <td><Link to ={"/user/"+device.id}>View user</Link></td>
                </tr>
                
        )
        if (loading){
            return <div class="spinner-border text-info" role="status">
            <span class="sr-only">Loading...</span>
          </div>;
        }
        return (
        <div>
            <div className="row mb-4">
                <div className="col-sm-12 grid-margin">
                <div className="card h-100">
                <h4 className="card-header">Device List</h4>
                <div className="card-body">
                <table className="table table-hover table-striped table-responsive text">
                <thead className="bg-danger">
                <tr>
                   <th scope="col">S/N</th>
                  <th scope="col">{numberOfDevices}</th>
                  <th scope="col">Assigned</th>
                  <th scope="col">Unassigned</th>
                  <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {deviceData}
                </tbody>
                </table>
                </div>
                </div>
                </div>
                </div>
        </div>
        );
    }
}
