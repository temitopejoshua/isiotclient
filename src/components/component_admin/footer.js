import React, {Component} from 'react';
import './nav.css';
import logo from './is-logo.png'



export default class Footer extends Component{

    render(){
        return(
            <div>
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row text-muted">
                           <div className="col-6 text-left">
                            <p>
                            <a href="/admin/home" className="muted">                                        
                            <img src={logo} className="img-fluid rounded-circle mb-2" alt="user" style={{ height: "50px", width: "50px", fill:'%23000'}}/><span>Internet Solutions</span></a>
                            </p>
                           </div>
                           <div className="col-6 text-right">
                               <ul className="list-inline">
                                   <li className="list-inline-item">
                                        <a className="text-muted" href="#">About Us</a>
                                   </li>
                                   <li className="list-inline-item">
                                        <a className="text-muted" href="#">Help</a>
                                   </li>
                                   <li className="list-inline-item">
                                        <a className="text-muted" href="#">Contact</a>
                                   </li>
                                   <li className="list-inline-item">
                                        <a className="text-muted" href="#">Terms & Condition</a>
                                   </li>
                               </ul>
                           </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}