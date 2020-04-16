import React from 'react';
import ClientsTable from './ClientsTable';



//client's table card for admin page
export default class Clients extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clients: [],
            loading: true,
            clientsPerPage: 5,
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
    const {loading,clients, clientsPerPage} = this.state;

        return (
        <div>
            <div className="row mb-4">
            <div className="col-sm-12 grid-margin">
                <div className="card h-100">
                <h4 className="card-header">Clients</h4>
                <div className="card-body">
                <ClientsTable
                loading={loading}
                clients={clients}
                clientsPerPage={clientsPerPage}
                />
                </div>
                </div>
            </div>
            </div>
        </div>
        );
    }
}