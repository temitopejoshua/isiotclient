import React, {Component} from 'react';
import AddUser from './components/addUser';


export default class Register extends Component{
    
    render(){
        return(
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-10 col-md-8 col-lg-6">
                    <AddUser/>
                    </div>
                </div>
            </div>  
        );
    }
}