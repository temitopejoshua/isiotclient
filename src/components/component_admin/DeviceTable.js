import React from 'react';
import { Link } from 'react-router-dom';
import { PaginatedList } from 'react-paginated-list'
import DeleteDevice from './DeleteDevice';


const DeviceTable = ({devices, loading, devicesPerPage}) =>{


    function deleteDevice(id){
        const url = "http://localhost:8081/api/devices2/" + id
        fetch(url, {
            crossOrigin: true,
            method: 'DELETE',
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response))
    
    }

    if (loading){
        return <div class="spinner-border text-info" role="status">
        <span class="sr-only">Loading...</span>
      </div>;
    }

    const totalCount=devices.length
    const deviceTable = <PaginatedList
    list={devices}
    itemsPerPage={devicesPerPage}
    renderList={(list) => (
        <div row deviceTable>
            <table className="table table-hover table-striped table-responsive">
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
                {list.map((device, index) => {
                    return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{device.name}</td>
                            <td>{device.devEui}</td>
                            <td>{device.assigned ? "Yes": "No"}</td>
                            <td><i class="fa fa-close" onClick={() => <DeleteDevice id={device.id}/>}>Delete</i></td>
                            <td><Link to ={"/admin/deviceinfo/"+device.id}>View</Link></td>
                        </tr>
                    );
                })}
            </table>
        </div>
    )}
    />
    return (
        <div className="table-hover table-striped table-responsive text-nowrap">
            <tbody>
            {deviceTable}
            <h6>Total Devices: {totalCount}</h6>
            </tbody>
        </div>
        );
}

export default DeviceTable;