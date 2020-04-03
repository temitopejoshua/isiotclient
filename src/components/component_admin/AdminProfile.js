import React, {Component} from 'react';
import SideNav from './Sidenav'; 
import user1 from './user.svg'


export default class AdminProfile extends Component{
    constructor(props){
        super(props)
        this.state={
            client: {},
        }
    }

    fetchClient = () => {
        // Read the token from the session storage
        // and include it to Authorization header
        const token = window.sessionStorage.getItem("jwt");
        fetch('http://localhost:8081/api/clients/access',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    client: responseData,
                });
            })
            .catch(err => console.error(err));
    }
    componentDidMount() {
        this.fetchClient()
    }


    render(){
        const user = window.sessionStorage.getItem("user");
        return(
            <div className="wrapper">
                <div>
                <SideNav/>
                </div>
                <div className="main">
                    <div className="container-fluid">
                        <h2>User Profile</h2>
                        <div className="row ">
                            <div className="col-md-4 col-lg-3 profile_card">
                                <div className="card mb-3">
                                    <div className="card-body text-center">
                                    <div className="sidebar-user">
					                    <img src={user1} className="img-fluid rounded-circle mb-2" alt="user" style={{ height: "100px", width: "100px"}}/>
                                        <div className="font-weight-bold">{this.state.client.name}</div>
					                    <small>IOT Admin</small>
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
                                                <h6>{this.state.client.name}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="font-weight-bold">Email Address</h6>
                                                
                                                <hr/>
                                                <h6>{this.state.client.emailAddress}</h6>
                                            </div>
                                        </div>
                                        <div className="row row_card">
                                            <div className="col-6">
                                                <h6 className="font-weight-bold">Phone Number</h6>
                                                
                                                <hr/>
                                                <h6>{this.state.client.phoneNumber}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="font-weight-bold">Address</h6>
                                                <hr/>
                                                <h6>{this.state.client.address}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                            <button className="btn btn-primary">Edit Profile</button>
                                        </div>
                                </div>
                                <div className="card profile_card">
                                    <div className="card-header">
                                    <h5 className="card-title">Collegues</h5>
                                    </div>
                                    <div className="card-body h-100">
                                    <div className="row row_card">
                                            <div className="col-2">
                                            <img src={user1} className="img-fluid rounded-circle mb-2" alt="user" style={{ height: "50px", width: "50px", fill:'%23000'}}/>
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
                                            <img src={user1} className="img-fluid rounded-circle mb-2" alt="user" style={{ height: "50px", width: "50px", fill:'%23000'}}/>
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
