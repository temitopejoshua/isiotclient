import React from 'react';
import { Link } from 'react-router-dom';


const DeviceTable = ({devices, loading}) =>{
    if (loading){
        return <div class="spinner-border text-info" role="status">
        <span class="sr-only">Loading...</span>
      </div>;
    }

    // var row =1;
    const deviceData = devices.map(
        (device, index) =>
            <tr key={index++}>
                <td>{index}</td>
                <td>{device.name}</td>
                <td>{device.devEui}</td>
                <td>{device.assigned ? "Yes": "No"}</td>
                <td><i class="fa fa-close">Suspend</i></td>
                <td><Link to ={"/admin/deviceinfo/"+device.id}>View</Link></td>
            </tr>
    )
    return (
        <div>
        <table className="table table-hover table-striped table-responsive text">
                <thead style={{background: "#01e2ff", color: "white" }}>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Name</th>
                  <th scope="col">Device Eui</th>
                  <th scope="col">Assigned</th>
                  <th scope="col">Action</th>
                  <th scope="col">Device Details</th>
                </tr>
                </thead>
                <tbody>
                    {deviceData}
                </tbody>
        </table>
        </div>
        );
}

export default DeviceTable;