import React from 'react';
import LoginPage from './components/loginpage'

class App extends React.Component {

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

export default App;
