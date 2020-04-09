import React from  'react';
import { Link } from 'react-router-dom';


const ClientsTable = ({ clients, loading }) => {
    if (loading){
        return <div class="spinner-border text-info" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    }

    var row =1;
    const clientData = clients.map(
        (client, index) =>
            <tr key={index}>
                <td>{row++}</td>
                <td>{client.name}</td>
                <td>{client.emailAddress}</td>
                <td>{client.active ? "Active" : "Suspended"}</td>
                <td><i class="fa fa-close">Suspend</i></td>
                <td><Link to ={"/user/"+client.id}>View</Link></td>
            </tr>
    )

    return (
        <div>
             <table className="table table-hover table-striped table-responsive text">
                <thead style={{background: "#01e2ff", color: "white" }}>
                <tr>
                   <th scope="col">S/N</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                  <th scope="col">User Details</th>
                </tr>
                </thead>
                <tbody>
                {clientData}
                </tbody>
                </table>
        </div>
    );
}

export default ClientsTable;




