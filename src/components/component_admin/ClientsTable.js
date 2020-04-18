import React from 'react';
import { Link } from 'react-router-dom';
import { PaginatedList } from 'react-paginated-list';


const ClientsTable = ({ clients, loading, clientsPerPage }) => {
    if (loading) {
        return <div class="spinner-border text-info" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    }
    const totalCount = clients.length
    const clientTable = <PaginatedList
        list={clients}
        itemsPerPage={clientsPerPage}
        renderList={(list) => (
            <div row deviceTable>
                <table className="table table-hover table-striped table-responsive">
                    <thead style={{ background: "#01e2ff", color: "white" }}>
                        <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email Address</th>
                            <th scope="col">Status</th>
                            <th scope="col">User Details</th>
                        </tr>
                    </thead>
                    {list.map((client, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{client.name}</td>
                                <td>{client.emailAddress}</td>
                                <td>{client.active ? "Active" : "Suspended"}</td>
                                <td><button className="btn btn-primary"><Link className="btn_table" to={"/admin/clients/" + client.id}>View</Link></button></td>
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
                {clientTable}
                <h6>Total Clients: {totalCount}</h6>
            </tbody>
        </div>
    );
}


export default ClientsTable;


