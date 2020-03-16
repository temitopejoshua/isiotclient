import React from 'react';
import Home from './ClientList';
import DashBoard from './dashboard'



export default class LoginPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            emailAddress: '',
            password: '',
            isAuthenticated: false,
        }
    }
    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    login = () => {
        const user = { emailAddress: this.state.emailAddress, password: this.state.password };
        fetch('http://localhost:8081/login', {
            method: 'POST',
            body: JSON.stringify(user)
        })
            .then(res => {
                const jwtToken = res.headers.get('Authorization');
                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    sessionStorage.setItem("isAuthenticated", true);
                    this.setState({
                        isAuthenticated: true,
                    });
                }
            })
            .catch(err => console.error(err))
    }

    render() {
        if(sessionStorage.getItem("isAuthenticated") === 'true'){
        return <div> 
                <DashBoard/>
            </div>
        }
        else{
        return (
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
                <form>
                    <h3 className="text-center">Sign In</h3>
                    <div className="form-group">
                    <label>Email Address</label>
                    <input type='text' placeholder='Enter email' name='emailAddress' className="form-control" onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                    <label className="text-right">Password</label>
                    <input type='password' placeholder='Enter Password' name='password' className="form-control" onChange={this.handleChange}></input>
                    </div>
                   
                </form> 
                <button color="success" className="btn btn-primary btn-block" onClick={this.login}>Login</button>
                    <p className="forget-pasword text-right">
                        Forget <a href="#">password?</a></p>
            </div>
            </div>
        </div> 
        );
        }
    }
}