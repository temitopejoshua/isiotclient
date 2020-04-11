import React from 'react';
import Pagination from './Pagination';
import DeviceTable from './DeviceTable';
import UploadDevice from './UploadDevice';
import SideNav from './Sidenav';
import './Admin.css'; 


export default class DevicePage extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            devices: [],
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

        const {loading,currentPage, devicesPerPage, devices} = this.state;

        const indexOfLastDevice = currentPage * devicesPerPage;
        const indexofFirstDevice = indexOfLastDevice - devicesPerPage;
        const currentDevices = devices.slice(indexofFirstDevice, indexOfLastDevice);
         
        //ChangePage on click
        const paginate =(pageNumber) => this.setState({currentPage: pageNumber})
    
        return (
        <div className="wrapper">
            <div>
                <SideNav/>
            </div>
            <div className="main">
            <div className="row">
                <div className="col-sm-12 col-lg-12 grid-margin">
                <div className="card h-100">
                <h4 className="card-header">Device List</h4>
                <div style={{marginLeft: "15px"}}><UploadDevice /></div>
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
        </div>
        );
    }
}
