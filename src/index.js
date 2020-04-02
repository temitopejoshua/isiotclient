import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Register from './components/component_client/RegisterClient'
import MapContainer from './components/map';
import ClientList from './components/ClientList';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Logout from './components/logout'
import ClientHome from './components/component_client/ClientHome'
import ClientLogin from './components/component_client/ClientLogin'
import Device from './components/component_client/device'
import Profile from './components/component_client/ClientProfile'
import ClientDevices from './components/component_client/ClientDevices'
import DashBoard from './components/dashboard'
import Table from './components/Table';
import Devices from './components/Devices';
import UserDetail from './components/userDetail'


import AdminPage from './components/AdminPage';


const routing = (
  <Router>
    <Route path="/maps" component={MapContainer} />
    <Route exact path="/admin" component={App} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/clients/:id" component={UserDetail} />
    <Route exact path="/login" component={ClientLogin} />
    <Route excat path="/home" component={ClientHome} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/device/:id" component={Device} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/client/devices" component={ClientDevices} />



    <Route path="/clients" component={ClientList} />
    <Route path="/devices" component={Devices} />
    {/* <Route exact path="/admin/home" component={Table}/> */}
    {/* <Route exact path="/admin/home" component={DashBoard}/> */}
    <Route exact path="/admin/home" component={AdminPage} />
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));



