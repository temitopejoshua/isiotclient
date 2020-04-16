import React from 'react'
import { Redirect } from 'react-router-dom'
import styles from './client_style.css'
import ClipLoader from "react-spinners/ClipLoader";


export default class ClientLogin extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            emailAddress: '',
            password: '',
            isAuthenticated: false,
            loginButtonDisabled: true,
            errors: '',
            loading: false


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
        this.setState({ loading: true })
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
                    this.setState({
                        errors: "Sorry, that didn\'t work please try again",
                        loading: false
                    })
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
                                <figure><img src="images/is-logo.png" alt="sing up image"></img></figure>
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
                                        <a href="/forgetpassword" class="signup-image-link text-right">Forget Password?</a>
                                    </div>

                                </form>
                                <div class="row">
                                    <div class="form-group form-button col-md-6">
                                        <button onClick={this.login} disabled={this.state.loginButtonDisabled} class="form-submit">Login</button>
                                    </div>

                                    <div class="text-right col-md-6">
                                        <ClipLoader
                                            size={15}
                                            color={"blue"}
                                            loading={this.state.loading}
                                        />
                                    </div>
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

