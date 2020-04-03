import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Register from './Register';
import MapContainer from './components/component_admin/map';
import ClientList from './components/component_admin/ClientList'
import { Route, BrowserRouter as Router , Redirect} from 'react-router-dom'
import Logout from './components/logout'
import UserLogin from './components/UserLogin'
import Devices from './components/component_admin/Devices';
import AdminProfile from './components/component_admin/AdminProfile';

import AdminPage from './components/component_admin/AdminPage';


const routing = (
    <Router>
    <Route path="/adminprofile" component={AdminProfile} />
    <Route path="/register" component={Register} />
    <Route path="/maps" component={MapContainer}/>
      <Route exact path="/admin" component={App} />
      <Route path="/clients" component={ClientList}/>
      <Route path="/admin/devices" component={Devices}/>
      <Route exact path="/admin/home" component={AdminPage}/>
      <Route exact path="/login" component={UserLogin}/>
      <Route exact path="/logout" component={Logout}/>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

