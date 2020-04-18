import React, {Component} from 'react';
import './nav.css';


export default class SideNav extends Component{

    render(){
        return(
	    <div>
		<nav className="sidebar">
			<div className="sidebar-content">
				<div className="sidebar-brand" href="/">
                <img src="/images/is-logo.png" className="img-fluid rounded-circle mb-2" alt="user" style={{ height: "50px", width: "50px", fill:'%23000'}}/><span>Internet Solutions</span>
                </div>
				<ul className="nav flex-column nav-pills">
				<li className="nav-item">
						<a href="/admin/home" className="font-weight-bold nav-link">
						<i className="fa fa-fw fa-home nav-icon" style={{fontSize: '1.5em' }}/><span className="align-middle">HomePage</span>
            		</a>
					</li>
					<li className="nav-item">
						<a href="/admin/clients" className="font-weight-bold nav-link">
						<i className="fa fa-fw fa-users nav-icon" style={{fontSize: '1.5em' }}/><span className="align-middle">Clients</span>
            		</a>
					</li>
					<li className="nav-item">
						<a href="/admin/devices" data-toggle="" className="font-weight-bold nav-link">
						<i className="fas fa-bar-chart nav-icon" style={{fontSize: '1.5em' }}/><span className="align-middle">Devices</span>
            		</a>
					</li>
					<li className="nav-item">
						<a href="/admin/maps" data-toggle="" className="font-weight-bold nav-link">
						<i className="fas fa-map-marker-alt nav-icon" style={{fontSize: '1.5em' }}/><span className="align-middle">Location</span>
            		</a>
					</li>
					<li className="nav-item">
						<a href="#auth" data-toggle="collapse" className="font-weight-bold nav-link">
						<i className="material-icons nav-icon" style={{fontSize: '1.5em' }}>settings</i><span className="align-middle">Settings</span>
            			</a>
						<ul id="auth" className="sidebar-dropdown list-unstyled collapse ">
							<li className="nav-item"><a className="nav-link" href="/resetpassword">Reset Password</a></li>
							<li className="nav-item"><a className="nav-link" href="/admin/profile">User Profile</a></li>
							<li className="nav-item"><a className="nav-link" href="/settings">Settings</a></li>
						</ul>
					</li>
				</ul>
			</div>
		    </nav>			
            </div>
        );
    }
}