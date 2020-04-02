import React from 'react';
import { Link } from 'react-router-dom';
import './ClientList.css';
import { Button } from 'react-bootstrap';
import Pagination from './Pagination';


export default class ClientList extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            clients: [],
            loading: true,
            clientsPerPage: 10,
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
    //Get current Clients
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexofFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = clients.slice(indexofFirstClient, indexOfLastClient);
     
    //ChangePage
    const paginate =(pageNumber) => this.pageNumber;


        
        var row =1;
        const clientData = this.state.clients.map(
            (client, index) =>
                <tr key={index}>
                    <td>{row++}</td>
                    <td>{client.name}</td>
                    <td>{client.emailAddress}</td>
                    <td>{client.isActive}</td>
                    <td><Button>Update</Button><Button>Suspend</Button></td>
                    <td><Link to ={"/clients/"+client.id}>View user</Link></td>
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
                <h4 className="card-header">Client List</h4>
                <div className="card-body">
                <table className="table table-hover table-striped table-responsive text">
                <thead className="bg-danger">
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
                <Pagination 
                clientsPerPage={clientsPerPage} 
                totalClients={clients.length} 
                paginate={paginate}
                />
                </div>
                </div>
                </div>
                </div>
        </div>
        );
    }
}
