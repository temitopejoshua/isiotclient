import React from 'react';
import SideNav from './Sidenav';
import ClientsTable from './ClientsTable';


export default class ClientPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clients: [],
            loading: true,
            clientsPerPage: 10,
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

        const { loading, clients, clientsPerPage } = this.state;
        return (
            <div className="wrapper">
                <div>
                    <SideNav />
                </div>
                <div className="main">
                    <div className="row">
                        <div className="col-sm-12 col-lg-12 grid-margin">
                            <div className="card h-100">
                                <h4 className="card-header">Client List</h4>
                                {/* <button className="btn btn-secondary ">Assign Device</button> */}
                                <div className="card-body">
                                    <ClientsTable
                                        clients={clients}
                                        loading={loading}
                                        clientsPerPage={clientsPerPage}
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
