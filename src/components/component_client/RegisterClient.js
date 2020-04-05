import React from 'react'
import { validateAll } from 'indicative/validator'
import styles from './client_style.css'
import ClipLoader from "react-spinners/ClipLoader";




export default class Register extends React.Component {



    constructor(props) {
        super(props);

        this.state = {
            emailAddress: '',
            password: '',
            password_confirmation: '',
            phoneNumber: '',
            name: '',
            address: '',
            isRegistered: false,
            deactivateSubmitButton: true,
            errors: {},
            errs: '',
            loading: false
        }
    }

    handleChange = (event) => {

        event.preventDefault()
        this.setState(
            {
                [event.target.name]: event.target.value,
                errors:{},
                errs:''

            }
        );

        const data = this.state
        const rules= {
            name: 'required|string',
            emailAddress: 'required|email',
            password: 'required|string|min:6|confirmed',
            address: 'required|string',
            phoneNumber: 'required|string|min:6'
        }
        const messages = {

            required: 'This {{field}} is required',
            'email.email': 'The email is invalid.',
            'password.confirmed': 'The password doesn\'t match',
            'password.min': 'Password is too short'
        }

        validateAll(data, rules, messages).then(() =>{

            console.log('success')
            this.setState({deactivateSubmitButton:false})
        }).catch((errors) =>{

            console.log(errors);
            //show errors to user
            const formattedErrors={}
            errors.forEach( error => formattedErrors[error.field] = error.message)
            this.setState({errors:formattedErrors, deactivateSubmitButton:true})
        })



    }

    register = (data) =>{

            this.setState({loading:true})
        fetch('http://localhost:8081/api/clients/',
        {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((response) => {


            if (response.status === 201) {
                this.setState({
                    isRegistered: true,
                })
            }

            else{
                this.setState({
                    errs:this.state.emailAddress+ "\nalready exists",
                    loading:false
            })

            }

        })
        .catch((err) => {
            console.error(err);
            this.setState({errs:err.toString()})
        });


    }

    handleSubmit = (event) => {

        event.preventDefault();
        
        const user = {
            emailAddress: this.state.emailAddress,
            password: this.state.password,
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address

        };

        this.register(user)

       



    }

    render() {



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
                                <form method="POST" class="register-form" id="register-form" onSubmit={this.handleSubmit}>
                                    <div class="form-group">
                                        <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                        <input placeholder="Name" name="name" onInput={this.handleChange}></input>
                                    </div>
                                    <p class="validationError">{this.state.errors.name}</p>

                                    <div class="form-group">
                                        <label for="email"><i class="zmdi zmdi-email"></i></label>
                                        <input type='email'  name='emailAddress'  placeholder="Email Address" onInput={this.handleChange}></input>
                                    </div>
                                    <p class="validationError">{this.state.errors.emailAddress}</p>

                                    <div class="form-group">
                                        <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                        <input type='password'  name='password'  placeholder="Password" onInput={this.handleChange}></input>
                                    </div>

                                    <div class="form-group">
                                        <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                                        <input type='password'  name='password_confirmation'  placeholder="Re-Type Password" onInput={this.handleChange}></input>
                                    </div>
                                    <p class="validationError">{this.state.errors.password}</p>

                                    <div class="form-group">
                                        <label for="re-pass"><i class="zmdi zmdi-phone-in-talk"></i></label>
                                        <input type='text' name='phoneNumber' placeholder="Phone Number" onInput={this.handleChange}></input>
                                    </div>
                                        <p class="validationError">{this.state.errors.phoneNumber}</p>
                                    <div class="form-group">
                                        <label for="re-pass"><i class="zmdi zmdi-balance"></i></label>
                                        <input type='text' name='address' placeholder="Home or Office Address" onInput={this.handleChange}></input>
                                    </div>
                                        <p class="validationError">{this.state.errors.address}</p>
                                    <div class="form-group form-button">
                                    <button type="submit" class="btn btn-primary btn-lg" disabled={this.state.deactivateSubmitButton} >Register </button>

                                </div>
                                        <p class="validationError">{this.state.errs}</p>

                                </form>

                                <ClipLoader
                                            size={30}
                                            color={"blue"}
                                            loading={this.state.loading}
                                        />
                               
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


