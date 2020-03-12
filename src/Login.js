import React, {Component} from 'react';
import LoginPage from './components/loginpage'


export default class Login extends Component{

    render(){
        return(
            <div className="container">
              <div className="row justify-content-center align-items-center">
              <div className="col-10 col-md-8 col-lg-6">
              <LoginPage/>
              </div>
              </div>
              </div>  
        ); 
      }
}