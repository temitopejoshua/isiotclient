import React, {Component} from 'react';
import './nav.css';
import SERVER_URL from '../ServerUrl';


export default class AdminTopNavBar extends Component{
    constructor(props){
        super(props)
        this.state={
            client: {},
        }
    }

    fetchClient = () => {
        const token = window.sessionStorage.getItem("jwt");
        fetch(SERVER_URL+ '/api/clients/access',
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
                            <img src="/images/user.svg" className="avatar img-fluid rounded mr-1" style={{ height: "30px", width: "30px"}}/><span class="text-dark">{this.state.client.name}</span>
                            </a>
							<div className="dropdown-menu dropdown-menu-right">
								<a className="dropdown-item" href="#">Profile</a>
								<div className="dropdown-divider"></div>
								<a className="dropdown-item" href="/admin/profile">My Profile</a>
                                {/* <a className="dropdown-item" href="/#">Activity Log</a>
								<a className="dropdown-item" href="/#">Account Settings</a> */}
                                <a className="dropdown-item" href="/logout">Sign Out</a>
							</div>
						</li>
                        <li className="nav-item dropdown">
							<a className="nav-link nav-link-user d-none d-sm-inline-block" href="#" data-toggle="dropdown">
                            <div className="position-relative">
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