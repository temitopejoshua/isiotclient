import React, {Component} from 'react';
import SideNav from './Sidenav'; 
import EditFields from './EditProfile/EditUserFields';
import {Redirect} from 'react-router-dom';
import SERVER_URL from '../ServerUrl';


export default class AdminProfile extends Component{
    constructor(props){
        super(props)
        this.state={
            admin: {},
        }
    }

    fetchAdmin = () => {
        const token = window.sessionStorage.getItem("jwt");
        fetch(SERVER_URL + '/api/clients/access',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    admin: responseData,
                });
            })
            .catch(err => console.error(err));
    }

    handleEdit = (data) => {

        const url = SERVER_URL + "/api/clients/" + this.state.admin.id

        fetch(url, {
            crossOrigin: true,
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response))
            .then(this.fetchData);

    }

    componentDidMount() {
        this.fetchAdmin()
    }

    render(){
        if (sessionStorage.getItem("isAdmin") !== 'true') {
            return <Redirect to="/admin/login" />
        }

        else {
        return(
            <div className="wrapper">
                <div>
                <SideNav/>
                </div>
                <div className="main">
                    <div className="container-fluid">
                        <h2>Admin Profile</h2>
                        <div className="row ">
                            <div className="col-md-4 col-lg-3 profile_card">
                                <div className="card mb-3">
                                    <div className="card-body text-center">
                                    <div className="sidebar-user">
                                        <img src="/images/user.svg" className="img-fluid rounded-circle mb-2" alt="user" style={{ height: "100px", width: "100px"}}/>
			                            <h6>Admin</h6>
				                        </div>
                                    </div>
                                    <hr/>
                                    <div className="card">
                                    <div className="card-header">Recent</div></div>
                                    <div className="card-body">
                                        <h5>Tasks</h5>
                                        <h5>Notifications</h5>
                                    </div>
                                </div>
                            </div>

                        
                            <div className="col-lg-9">
                                <div className="card profile_card">
                                    <div className="card-header">
                                        <h5 className="card-title">Profile Details</h5>
                                    </div>
                                    <div className="card-body h-100">
                                        <div className="row row_card">
                                            <div className="col-6">
                                                <h6 className="font-weight-bold">Full Name</h6>
                                                <hr/>
                                                <h6>{this.state.admin.name}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="font-weight-bold">Email Address</h6>
                                                
                                                <hr/>
                                                <h6>{this.state.admin.emailAddress}</h6>
                                            </div>
                                        </div>
                                        <div className="row row_card">
                                            <div className="col-6">
                                                <h6 className="font-weight-bold">Phone Number</h6>
                                                
                                                <hr/>
                                                <h6>{this.state.admin.phoneNumber}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="font-weight-bold">Address</h6>
                                                <hr/>
                                                <h6>{this.state.admin.address}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                            <EditFields 
                                            fetchData={this.fetchAdmin} 
                                            handleEdit={this.handleEdit} 
                                            data={this.state.admin} />
                                        </div>
                                </div>
                                <div className="card profile_card">
                                    <div className="card-header">
                                    <h5 className="card-title">Collegues</h5>
                                    </div>
                                    <div className="card-body h-100">
                                    <div className="row row_card">
                                            <div className="col-2">
                                            <img src="/images/user.svg" className="img-fluid rounded-circle mb-2" alt="user" style={{ height: "100px", width: "100px"}}/>
                                            </div>
                                            <div className="col-5">
                                                <h6 className="font-weight-bold">Full Name</h6>
                                                <hr/>
                                                <h6>Adebiyi Victor</h6>
                                            </div>
                                            <div className="col-5">
                                                <h6 className="font-weight-bold">Email Address</h6>
                                                
                                                <hr/>
                                                <h6>adetosine6@gmail.com</h6>
                                            </div>
                                        </div>
                                        <div className="row row_card">
                                        <div className="col-2">
                                            <img src="/images/user.svg" className="img-fluid rounded-circle mb-2" alt="user" style={{ height: "100px", width: "100px"}}/>
                                            </div>
                                            <div className="col-5">
                                                <h6 className="font-weight-bold">Full Name</h6>
                                                <hr/>
                                                <h6>Temitope Joshua</h6>
                                            </div>
                                            <div className="col-5">
                                                <h6 className="font-weight-bold">Email Address</h6>
                                                <hr/>
                                                <h6>iamoyemadeteepee@gmail.com</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  }
}
