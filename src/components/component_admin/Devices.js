import React from 'react';
import DeviceTable from './DeviceTable';
import './Admin.css';


export default class Devices extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            devices: [],
            loading: true,
            devicesPerPage: 5,
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
                });
            })
            .catch(err => console.error(err));
    }
    componentDidMount() {
        this.fetchDevices()
    }

    render() {

        const { loading, devices, devicesPerPage } = this.state;

        return (
            <div className="">
                <div className="">
                    <div className="row">
                        <div className="col-sm-12 col-lg-12 grid-margin">
                            <div className="card h-100">
                                <h4 className="card-header">Devices</h4>
                                <div className="card-body">
                                    <DeviceTable
                                        devices={devices}
                                        loading={loading}
                                        devicesPerPage={devicesPerPage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
