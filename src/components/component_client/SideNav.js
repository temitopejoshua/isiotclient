import React, {Component} from 'react';


export default class SideNav extends Component{

    render(){
        return(
	    <div>
		<nav className="sidebar">
			<div className="sidebar-content">
				<div className="sidebar-brand" href="/">
				<img src="/images/is-logo.png" alt="logo" className="img-fluid rounded-circle mb-2" style={{ height: "50px", width: "50px", fill:'%23000'}}/><span>Internet Solutions</span>
                </div>
				<ul className="nav flex-column nav-pills">
				<li className="nav-item">
						<a href="/home" className="font-weight-bold nav-link">
						<i className="fa fa-fw fa-home nav-icon" style={{fontSize: '1.5em' }}/><span className="align-middle">Home</span>
            		</a>
					</li>
					<li className="nav-item">
						<a href="/profile" className="font-weight-bold nav-link">
						<i className="fa fa-fw fa-users nav-icon" style={{fontSize: '1.5em' }}/><span className="align-middle">Profile</span>
            		</a>
					</li>
					<li className="nav-item">
						<a href="/client/devices" className="font-weight-bold nav-link">
						<i class="fas fa-mobile-alt nav-icon" style={{fontSize: '1.5em' }}/><span className="align-middle">Devices</span>
            		</a>
					</li>
				</ul>
			</div>
		    </nav>			
            </div>
        );
    }
}