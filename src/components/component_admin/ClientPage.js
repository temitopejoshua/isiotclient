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

        const {loading,clients, clientsPerPage} = this.state;
        return (
        <div className="wrapper">
            <div>
                <SideNav/>
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





// import React from 'react';
// import { Redirect } from 'react-router-dom';
// import SideNav from './Sidenav';
// import { Link } from 'react-router-dom';


// export default class ClientPage extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             clients: [],
//             loading: true,
//         }
//     }
//     fetchClients = () => {
//         // Read the token from the session storage
//         // and include it to Authorization header
//         const token = window.sessionStorage.getItem("jwt");
//         fetch('http://localhost:8081/api/clients',
//             {
//                 headers: { 'Authorization': token }
//             })
//             .then((response) => response.json())
//             .then((responseData) => {
//                 this.setState({
//                     clients: responseData._embedded.clients,
//                     loading: false,
//                 });
//             })
//             .catch(err => console.error(err));
//     }
//     componentDidMount() {
//         this.fetchClients()
//     }
//     render() {
//     const {loading,clients} = this.state;

//     var row =1;
//     const clientData = clients.map(
//         (client, index) =>
//             <tr key={index}>
//                 <td>{row++}</td>
//                 <td>{client.name}</td>
//                 <td>{client.emailAddress}</td>
//                 <td>{client.active ? "Active" : "Suspended"}</td>
//                 <td><Link to ={"/admin/clients/"+client.id}><i class="fa fa-close">Suspend</i></Link></td>
//                 <td><Link to ={"/admin/clients/"+client.id}>View</Link></td>
//             </tr>
//     )

//     if (sessionStorage.getItem("isAuthenticated") !== 'true') {
//         return <Redirect to="/admin/login" />
//     }

//     else {
//         return (
//         <div>
//             <div className='wrapper'>
//             <div>
//                 <SideNav/>
//             </div>
//             <div className="main">
//                 <div className="card flex-fill w-100">
//                     <h4 className="card-header">Client List</h4>
//                     <div className="card-body">
//                     <div className="table-responsive">
//                     <table className="table table-hover table-striped">
//                         <thead style={{background: "#01e2ff", color: "white" }}>
//                             <tr>
//                                 <th scope="col">S/N</th>
//                                 <th scope="col">Name</th>
//                                 <th scope="col">Email Address</th>
//                                 <th scope="col">Status</th>
//                                 <th scope="col">Action</th>
//                                 <th scope="col">User Details</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {clientData}
//                         </tbody>
//                         </table>
//                         </div>
//                     </div>
//                     </div>
//                 </div>
//                 </div>
//             </div>
//         );
//     }

// }
// }
