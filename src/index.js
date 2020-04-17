import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {MapPage as AdminMap} from './components/component_admin/MapPage';
import ClientPage from './components/component_admin/ClientPage'
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import AdminLogin from './components/component_admin/AdminLogin'
import DevicePage from './components/component_admin/DevicePage';
import AdminProfile from './components/component_admin/AdminProfile';
import Register from './components/component_client/RegisterClient'
import Logout from './components/logout'
import ClientHome from './components/component_client/ClientHome'
import ClientLogin from './components/component_client/ClientLogin'
import Device from './components/component_client/device'
import Profile from './components/component_client/ClientProfile'
import ClientDevices from './components/component_client/ClientDevices'
import UserDetail from './components/userDetail'
import ActivateAccount from './components/component_client/ActivateAccount'
import ForgetPassword from './components/component_client/ForgetPassword'
import ResetPassword from './components/component_client/ResetPassword'
import ClientList from './components/component_admin/ClientList'
import Devices from './components/component_admin/Devices'
import AdminPage from './components/component_admin/AdminPage';
import DeviceInfo from './components/component_admin/DeviceInfo';
import NotFound from './components/component_admin/NotFound';



const routing = (

    <Router>
    <Switch>
    <Route exact path="/admin/deviceinfo/:id" component={DeviceInfo}/>
    <Route exact path="/admin/profile" component={AdminProfile} />
    <Route exact path="/admin/maps" component={AdminMap}/>
    <Route exact path="/admin/clients" component={ClientPage}/>
    <Route exact path="/admin/devices" component={DevicePage}/>
    <Route exact path="/admin/home" component={AdminPage}/>
    <Route exact path="/admin/login" component={AdminLogin}/>
    <Route exact path="/admin/logout" component={Logout}/>
    <Route exact path="/admin" component={App} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/admin/clients/:id" component={UserDetail} />

    {/* Client Route */}
    <Route exact path="/" component={ClientLogin} />
    <Route exact path="/login" component={ClientLogin} />
    <Route excat path="/home" component={ClientHome} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/device/:id" component={Device} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/client/devices" component={ClientDevices} />
    <Route exact path="/activate" component={ActivateAccount}/>
    <Route exact path="/resetpassword" component={ResetPassword} />
    <Route exact path="/forgetpassword" component={ForgetPassword}/>
    <Route path="/clients" component={ClientList} />
    <Route path="/devices" component={Devices} />
    <Route path="*" component={NotFound}/>
    </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));



