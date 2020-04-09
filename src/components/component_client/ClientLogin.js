import React from 'react'
import { Redirect } from 'react-router-dom'
import styles from './client_style.css'

export default class ClientLogin extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            emailAddress: '',
            password: '',
            isAuthenticated: false,
            loginButtonDisabled: true,
            errors: ''
        }
    }
    handleChange = (event) => {

        this.setState(
            {
                [event.target.name]: event.target.value,
                loginButtonDisabled: false,
                errors: ''

            }
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
                else {
                    this.setState({ errors: "Email address and password does not match" })
                }
            })
            .catch(errors => console.error(errors))
    }
    render() {

        if (sessionStorage.getItem("isAuthenticated") === 'true') {

            return <Redirect to="/home" />
        }
        else {
            return (
                <section class="sign-in">
                    <div class="container">
                        <div class="signin-content">
                            <div class="signin-image">
                                <figure><img src="images/signin-image.jpg" alt="sing up image"></img></figure>
                                <a href="/register" class="signup-image-link">Create an account</a>
                            </div>
                            <div class="signin-form">
                                <h2 class="form-title">Sign In</h2>
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

