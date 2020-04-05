import React from 'react';
import { Redirect } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";



export default class AdminLogin extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            emailAddress: '',
            password: '',
            isAuthenticated: false,
            error: '',
            loading:false
        }
    }
    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value,
            error: '' }
        );
    }

    login = () => {

        this.setState({
            loading:true
        })
        const user = { emailAddress: this.state.emailAddress, password: this.state.password };
        fetch('http://localhost:8081/login', {
            method: 'POST',
            body: JSON.stringify(user)
        })
            .then(res => {
                const jwtToken = res.headers.get('Authorization');
                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    this.setState({
                        isAuthenticated: true,
                    });
                }

                else{

                    this.setState({

                        error: 'Email Address and Password does not match',
                        loading:false
                        
                    })
                }
            })
            .catch(err => console.error(err));

            this.checkAdmin()

      
    }

    checkAdmin = () => {

        if (validateAdmin()) {

            sessionStorage.setItem("isAuthenticated", true);
            this.setState({
                isAuthenticated: true,
            });

        }

        else{

            this.setState({
                error: 'Access Denied',
                loading:false
            });

        }


    }

    render() {
        if (sessionStorage.getItem("isAuthenticated") === 'true') {
            return <Redirect to="/admin/home" />
        }
        else {
            return (
                <div>
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-10 col-md-8 col-lg-6">
                                <form>
                                    <h3 className="text-center">Admin</h3>
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
                                <ClipLoader
                                                size={15}
                                                color={"blue"}
                                                loading={this.state.loading}
                                            />
                                <p className="forget-pasword text-right">
                                    Forget <a href="/forgetpassword">password?</a>
                                </p>
                            </div>
                                <p style={{color: 'red'}}>{this.state.error}</p>
                        </div>
                    </div>

                </div>
            );
        }
    }
}

function validateAdmin() {

    const token = window.sessionStorage.getItem("jwt");


    fetch('http://localhost:8081/api/clients/access',
        {
            headers: { 'Authorization': token }
        })
        .then((response) => response.json())
        .then((responseData) => {

            sessionStorage.setItem("status", responseData.admin)


        })
        .catch(err => console.error(err));

    const status = sessionStorage.getItem("status")
    sessionStorage.removeItem("status")

    if (status === "true") {
        return true;
    }

    else {
        return false
    }


}