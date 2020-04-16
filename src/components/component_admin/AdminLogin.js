import React from 'react';
import  { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class AdminLogin extends React.Component {

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
                    this.setState({ errors: "Check your email address and password" })
                }
            })
            .catch(errors => console.error(errors))

    }

    checkAdmin = () => {

        if (validateAdmin()) {

            sessionStorage.setItem("isAdmin", true);
            this.setState({
                isAuthenticated: true,
            });

        }

        else {

            this.setState({
                errors: 'Access Denied',
                loading: false
            });
                console.log(this.state.errors)
        }
    }

    render() {

        if (sessionStorage.getItem("isAdmin") === 'true') {
            return <Redirect to="/admin/home" />
        }
        else {
            return (
                <section>
                    <div class="container_admin">
                                <div className="image_container">
                                    <img src="images/is-logo.png" alt="logo" className="signin_img"></img>
                                    <h2 class="form_title">Internet Solutions</h2>
                                </div>
                                <form method="POST" class="" id="login-form">
                                    <div class="form-group">
                                        <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type='text' placeholder='Enter email' name='emailAddress' onChange={this.handleChange}></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                        <input type='password' placeholder='Enter Password' name='password' onChange={this.handleChange}></input>
                                    </div>
                                </form>
                                <div class="form_group form_button">
                                    <p class="validationError">{this.state.errors}</p>
                                    <button onClick={this.login} class="form_submit">Log in</button>
                            </div>
                        </div>
                </section>
            );
        }
    }
}



function validateAdmin () {
    const token = window.sessionStorage.getItem("jwt");
    axios.get('http://localhost:8081/api/clients/access',
    {
        headers: {'Authorization': token}
    })
    .then((response) => {
        sessionStorage.setItem("status", response.data.admin)
        console.log("admin status"+response.data.admin)
    })
    .catch(e => console.error(e));


    const status = sessionStorage.getItem("status")
    sessionStorage.removeItem("status")
    if(status === "true"){
        console.log(status)
        return true
    }
    else{
        return false
    }
}