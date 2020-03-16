import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Register from './Register';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import UserDetail from './components/userDetail';
import MapContainer from './components/map';
import ClientList from './components/ClientList';

const routing = (
    <Router>
      <Route path="/userdetails" component={UserDetail}/>
      <Route path="/register" component={Register} />
      <Route path="/clients" component={ClientList}/>
      <Route exact path="/" component={App} />
      <Route path="/user/:id" component={UserDetail}/>
      <Route path="/maps" component={MapContainer}/>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

