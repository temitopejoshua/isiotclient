import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import DeviceTable from './DeviceTable';



export default class Devices extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            devices: [],
            numberOfDevices:0,
            loading: true,
            devicesPerPage: 5,
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

        const {loading,numberOfDevices, currentPage, devicesPerPage, devices} = this.state;

        const indexOfLastDevice = currentPage * devicesPerPage;
        const indexofFirstDevice = indexOfLastDevice - devicesPerPage;
        const currentDevices = devices.slice(indexofFirstDevice, indexOfLastDevice);
         
        //ChangePage on click
        const paginate =(pageNumber) => this.setState({currentPage: pageNumber})
    
        return (
        <div>
            <div className="row">
                <div className="col-sm-12 col-lg-12 grid-margin">
                <div className="card h-100">
                <h4 className="card-header">Device List</h4>
                <div className="card-body">
                <DeviceTable 
                devices={currentDevices} 
                loading={loading}
                />
                <Pagination 
                objectsPerPage={devicesPerPage} 
                lastIndex={indexOfLastDevice} 
                totalObjects={devices.length} 
                paginate={paginate}
                firstIndex={indexofFirstDevice + 1}
                />
                </div>
                </div>
                </div>
                </div>
        </div>
        );
    }
}
