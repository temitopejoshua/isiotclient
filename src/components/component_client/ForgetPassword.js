import React from 'react'
import styles from './client_style.css'
import MoonLoader from "react-spinners/MoonLoader";




export default class ForgetPassword extends React.Component {


    constructor(props) {

        super(props)
        this.state = {

            emailAddress: '',
            error: '',
            sentSuccessfully: false,
            loading:false
        }
    }

    handleSubmit = () => {

            this.setState({loading:true})
        fetch('http://localhost:8081/api/clients/forgetpassword?emailAddress=' + this.state.emailAddress,
            {
                crossDomain: true,
                method: 'POST',
            })
            .then((response) => {

                if (response.status === 404) {

                    this.setState({
                        error: 'Email ' + this.state.emailAddress + ' does not exist',
                        loading:false
                    })
                }

                if (response.status === 200) {

                    this.setState({
                        sentSuccessfully: true
                    })


                }


            })
            .catch((err) => {
                console.error(err);
            });

    }

    handleChange = (event) => {
        event.preventDefault();

        this.setState(
            {
                [event.target.name]: event.target.value,
                error: ''
            }
        );

    }


    render() {


        if (this.state.sentSuccessfully) {

            return (
            <div class="container mt-5">
                <div class="row">
                    <div class="col-md-12 no-border">
                        <div class="card card-s">
                            <div class="card-body">
                                <h3>Follow the link sent to your email</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }

        else {
            return (

                <div>

                    <section class="signup">
                        <div class="container">
                            <div class="signup-content">
                                <div class="signup-form">
                                    <h2 class="form-title">Forget Password</h2>
                                    <form class="register-form" id="register-form">

                                        <div class="form-group mt-5">
                                            <label for="email"><i class="zmdi zmdi-email"></i></label>
                                            <input type='email' name='emailAddress' placeholder="Email Address" required onChange={this.handleChange}></input>
                                        </div>

                                    </form>
                                    <div class="form-group form-button mt-3">
                                        <button type="submit" class="btn btn-primary btn-lg" onClick={this.handleSubmit}>Submit                                         
                                         </button>
                                    </div>

                                    <p class="validationError">{this.state.error}</p>

                                    <MoonLoader
                                            size={30}
                                            color={"blue"}
                                            loading={this.state.loading}
                                        />
                                 
                                </div>
                                <div class="signup-image">
                                    <figure><img src="images/signup-image.jpg" alt="sing up image"></img></figure>
                                </div>
                            </div>
                        </div>
                    </section>


                </div>
            );
        }
    }
}