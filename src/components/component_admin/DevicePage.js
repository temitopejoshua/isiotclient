import React from 'react';
import DeviceTable from './DeviceTable';
import UploadDevice from './UploadDevice';
import SideNav from './Sidenav';
import './Admin.css'; 
import DeviceChart from './deviceChart';
import SERVER_URL from '../ServerUrl';



export default class DevicePage extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            devices: [],
            loading: true,
        }
    }
    fetchDevices = () => {
        // Read the token from the session storage
        // and include it to Authorization header
        const token = window.sessionStorage.getItem("jwt");
        fetch(SERVER_URL + '/api/devices',
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

    deleteDevice = () => {
        const url = SERVER_URL + "/api/devices2/" + this.state.device.id
        fetch(url, {
            crossOrigin: true,
            method: 'DELETE',
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response))
    
    }

    componentDidMount() {
        this.fetchDevices();

    }
    render() {

        const {loading,devices} = this.state;
        return (
        <div className="wrapper">
            <div>
                <SideNav/>
            </div>
            <div className="main">
            <div className="row">
                <div className="col-sm-12 col-lg-8 grid-margin">
                    <div className="card h-100">
                    <h4 className="card-header">Device Board</h4>
                        <div style={{marginLeft: "15px"}}><UploadDevice /></div>
                        <div className="card-body">
                            <DeviceTable 
                            devices={devices} 
                            loading={loading}
                        />
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-lg-4 grid-margin">
                    <div className="card h-100">
                    <h4 className="card-header">Assigned Device</h4>
                            <div>
                                <DeviceChart/>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        );
    }
}
