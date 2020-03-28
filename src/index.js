import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from './components/RegisterClient'
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router , Redirect} from 'react-router-dom'
import UserDetail from './components/userDetail'
import AdminHome from './components/AdminHome'
import Logout from './components/logout'
import ClientHome from './components/ClientHome'
import UserLogin from './components/UserLogin'
import Device from './components/device'
import Profile from './components/ClientProfile'
import ClientDevices from './components/ClientDevices'



const routing = (
    <Router>
      <Route exact path="/admin" component={App} />
        <Route exact  path="/register" component={Register} />
        <Route exact path="/clients/:id" component={UserDetail}/> 
         <Route exact path="/admin/home" component={AdminHome}/>
         <Route exact path="/login" component={UserLogin}/>
         <Route excat path="/home" component={ClientHome}/>
         <Route exact path="/logout" component={Logout}/>
         <Route exact path="/device/:id" component={Device}/> 
         <Route exact path="/profile" component={Profile}/>
         <Route exact path="/client/devices" component={ClientDevices}/>


        
    </Router>
  )




ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

