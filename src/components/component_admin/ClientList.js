import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import ClientsTable from './ClientsTable';


export default class ClientList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clients: [],
            loading: true,
            clientsPerPage: 5,
            currentPage: 1,
        }
    }
    fetchClients = () => {
        // Read the token from the session storage
        // and include it to Authorization header
        const token = window.sessionStorage.getItem("jwt");
        fetch('http://localhost:8081/api/clients',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    clients: responseData._embedded.clients,
                    loading: false,
                });
            })
            .catch(err => console.error(err));
    }
    componentDidMount() {
        this.fetchClients()
    }
    render() {
    const {loading, currentPage, clientsPerPage, clients} = this.state;
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexofFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = clients.slice(indexofFirstClient, indexOfLastClient);
    const paginate =(pageNumber) => this.pageNumber;
        return (
        <div>
            <div className="row mb-4">
                <div className="col-sm-12 grid-margin">
                <div className="card h-100">
                <h4 className="card-header">Client List</h4>
                <div className="card-body">
                <ClientsTable
                loading={loading}
                clients={clients}
                />
                <Pagination 
                objectsPerPage={clientsPerPage} 
                totalObjects={clients.length} 
                paginate={paginate}
                lastIndex={indexOfLastClient} 
                firstIndex={indexofFirstClient + 1}
                />
                </div>
                </div>
                </div>
                </div>
        </div>
        );
    }
}
