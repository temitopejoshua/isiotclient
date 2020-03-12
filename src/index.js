import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Register from './Register';
import Clients from './components/clientList';
// import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'


const routing = (
    <Router>
      <div>
        <Route path="/login" component={App} />
      </div>
        <div><Route path="/register" component={Register} />
      </div>
      <div>
        <Route path="/clients" component={Clients}/>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

