import React from 'react';
import LoginPage from './components/loginpage'
import './App.css';
import AdminLogin from './components/component_admin/AdminLogin'



class App extends React.Component {

  render(){
    return(
      <div className="container-fluid">
          <AdminLogin/>
      </div>
    );
  }
}

export default App;
