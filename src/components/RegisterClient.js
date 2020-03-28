import React from 'react'
import { Redirect } from 'react-router-dom'





export default class Register extends React.Component {



    constructor(props) {
        super(props);

        this.state = {
            emailAddress: '',
            password: '',
            passwordRepeat: '',
            phoneNumber: '',
            name: '',
            address: '',
            registrationResponse: {},
            isRegistered: false,
            loading: true
        }
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value,

            }
        );

        if (this.state.emailAddress.length < 5 && this.state.password == this.state.passwordRepeat) {

            this.setState({ loading: true })
        }
        else {

            this.setState({ loading: false })
        }

    }

    addUser = (event) => {

        // event.preventDefault();

        const user = {
            emailAddress: this.state.emailAddress,
            password: this.state.password,
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address

        };

        fetch('http://localhost:8081/api/clients/',
            {
                crossDomain: true,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            .then((response) => {


                if (response.status === 201) {
                    this.setState({
                        isRegistered: true,
                        registrationResponse: response.json


                    })
                }

            })
            .catch((err) => {
                console.error(err);
            });



    }

    render() {


        const { loading } = this.state.loading

        if (this.state.isRegistered) {

            return (
                <div>
                    <h5>Account verification email has been sent to {this.state.emailAddress} </h5>
                    <a href="/login"> Login Here</a>


                </div>)
        }

        else {
            return (


                <section class="signup">
                    <div class="container">
                        <div class="signup-content">
                            <div class="signup-form">
                                <h2 class="form-title">Sign up</h2>
                                <form method="POST" class="register-form" id="register-form">
                                    <div class="form-group">
                                        <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                        <input placeholder="Name" name="name" onChange={this.handleChange}></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="email"><i class="zmdi zmdi-email"></i></label>
                                        <input type='email' required name='emailAddress' required placeholder="Email Address" onChange={this.handleChange}></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                        <input type='password' required name='password' required placeholder="Password" onChange={this.handleChange}></input>

                                    </div>
                                    <div class="form-group">
                                        <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                                        <input type='password' required name='passwordRepeat' required placeholder="Re-Type Password" onChange={this.handleChange}></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="re-pass"><i class="zmdi zmdi-phone-in-talk"></i></label>
                                        <input type='text' name='phoneNumber' placeholder="Phone Number" onChange={this.handleChange}></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="re-pass"><i class="zmdi zmdi-balance"></i></label>
                                        <input type='text' name='address' placeholder="Home or Office Address" onChange={this.handleChange}></input>
                                    </div>


                                </form>

                                <div class="form-group form-button">
                                    <button type="submit" class="form-submit" onClick={this.addUser} disabled={this.state.loading}>Register </button>

                                </div>
                            </div>
                            <div class="signup-image">
                                <figure><img src="images/signup-image.jpg" alt="sing up image"></img></figure>
                                <a href="/login" class="signup-image-link">Login</a>
                            </div>
                        </div>
                    </div>
                </section>




            );

        }

    }
}


