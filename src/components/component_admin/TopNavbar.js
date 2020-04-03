import React, {Component} from 'react';
import './nav.css';
import user1 from './user.svg';
import settings from './settings.png'


export default class TopNavBar extends Component{
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

        const myStyle ={
            cursor: "pointer",
            fontSize: "30px"
        }
        return(
            <div>
                <nav className="navbar navbar-expand navbar-light sticky-top" style={{background: "#01e2ff"}}>
                {/* <a className="sidebar-toggle deflex mr-3">
                <span style={myStyle}>&#9776;</span>
                </a> */}
                <form className="">
                    <input className="form-control from-control-no-border navbar-search mr-sm-2"
                    type="text" placeholder="Search ..." arial-label="Search"/>
                </form>
                <div className="navbar-collapse collapse">
					<ul className="navbar-nav ml-auto">

						<li className="nav-item dropdown">
							<a className="nav-icon dropdown-toggle ml-2 d-inline-block d-sm-none" href="#" data-toggle="dropdown">
								<div className="position-relative">
									<i className="align-middle mt-n1" data-feather="settings"></i>
								</div>
							</a>
							<a className="nav-link nav-link-user dropdown-toggle d-none d-sm-inline-block" href="#" data-toggle="dropdown">
            <img src={user1} className="avatar img-fluid rounded mr-1" style={{ height: "30px", width: "30px"}}/><span class="text-dark">{this.state.client.name}</span>
                            </a>
							<div className="dropdown-menu dropdown-menu-right">
								<a className="dropdown-item" href="pages-profile.html">Profile</a>
								<div className="dropdown-divider"></div>
								<a className="dropdown-item" href="/adminprofile">My Profile</a>
								<a className="dropdown-item" href="/editprofile">Edit Profile</a>
                                <a className="dropdown-item" href="/activitylog">Activity Log</a>
								<a className="dropdown-item" href="/settings">Account Settings</a>
                                <a className="dropdown-item" href="signout">Sign Out</a>
                                
							</div>
						</li>
                        <li className="nav-item dropdown">
							<a className="nav-link nav-link-user d-none d-sm-inline-block" href="#" data-toggle="dropdown">
                            <div className="position-relative">
                            {/* <img src={settings} className="avatar img-fluid rounded mr-1" style={{ height: "30px", width: "30px"}}/> */}
                            <i className="fa fa-fw fa-bell" style={{fontSize: '1.7em' }}/>
                            <span className="indicator">4</span>
                            </div>
                            </a>
						</li>
                    </ul>
                </div>
                </nav>
            </div>
        );
    }
}