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
            loading: false,
        }
    }
    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value,
                error: ''
            }
        );
    }

    login = () => {

        this.setState({
            loading: true,
            error: ''
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

                    this.checkAdmin()

                }

                else {

                    this.setState({
                        error: 'Email Address and Password  match',
                        loading: false,

                    })
                }
            })
            .catch(err => console.error(err));
        


    }

    checkAdmin = () => {

        if (validateAdmin()) {

            sessionStorage.setItem("isAuthenticated", true);
            this.setState({
                isAuthenticated: true,
            });

        }

        else {

            this.setState({
                error: 'Access Denied',
                loading: false
            });

        }


    }


    render() {
        if (sessionStorage.getItem("isAuthenticated") === 'true') {
            return <Redirect to="/admin/home" />
        }
        else {
            return (
                <section class="sign-in">
                    <div class="container">
                        <div class="signin-content">
                            <div class="signin-image">
                                <figure><img src="images/signin-image.jpg" alt="sign up"></img></figure>
                                <a href="/register" class="signup-image-link">Create an account</a>
                            </div>
                            <div class="signin-form">
                                <h2 class="form-title">Admin Sign in</h2>
                                <form method="POST" class="register-form" id="login-form">
                                    <div class="form-group">
                                        <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type='text' placeholder='Enter email' name='emailAddress' onChange={this.handleChange}></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                        <input type='password' placeholder='Enter Password' name='password' onChange={this.handleChange}></input>
                                    </div>
                                    <div class="form-group">
                                        <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                                        <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
                                    </div>

                                </form>
                                <div class="form-group form-button">
                                    <button onClick={this.login} disabled={this.state.loginButtonDisabled} class="form-submit">Login</button>
                                </div>
                                <p class="validationError">{this.state.errors}</p>
                            </div>
                        </div>
                    </div>
                </section>
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