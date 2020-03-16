import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AddUser from './components/addUser'
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router , Redirect} from 'react-router-dom'
import UserDetail from './components/userDetail'
import AdminHome from './components/AdminHome'
import Logout from './components/logout'
import UserHome from './components/UserHome'
import UserLogin from './components/UserLogin'



const routing = (
    <Router>
      <Route exact path="/admin" component={App} />
        <Route exact  path="/register/new" component={AddUser} />
        <Route exact path="/user/:id" component={UserDetail}/> 
         <Route exact path="/admin/home" component={AdminHome}/>
         <Route exact path="/login" component={UserLogin}/>
         <Route excat path="/home" component={UserHome}/>
         <Route exact path="/logout" component={Logout}/>
        
    </Router>
  )




ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

