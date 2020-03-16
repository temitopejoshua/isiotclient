import React from 'react';
import { Link } from 'react-router-dom';
import './ClientList.css';


export default class ClientList extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            users: [],
        }
    }
    fetchUsers = () => {
        // Read the token from the session storage
        // and include it to Authorization header
        const token = window.sessionStorage.getItem("jwt");
        fetch('http://197.156.232.138:8081/api/users',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    users: responseData._embedded.users,
                });
            })
            .catch(err => console.error(err));
    }
    componentDidMount() {
        this.fetchUsers()
    }
    render() {
        var row =1;
        const userData = this.state.users.map(
            (user, index) =>
                <tr key={index}>
                    <td>{row++}</td>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.emailAddress}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.phoneNumber}</td>
                    <td><Link to ={"/"+user.id}>View user</Link></td>
                </tr>
        )
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
                  <th scope="col">Device ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Update</th>
                  <th scope="col">User Details</th>
                </tr>
                </thead>
                <tbody>
                {userData}
                </tbody>
                </table>
                </div>
                </div>
                </div>
                </div>
        </div>
        );
    }
}
