import React from 'react'
import {Redirect} from 'react-router-dom'

export default class ResetPassword extends React.Component {

    constructor(props) {

        super(props)
        this.state = {

            isSuccessful: false,
            password: '',
            client: {}

        }

    }

    verifyToken = () => {

        const param = params(window.location.search)

        fetch('http://localhost:8081/api/clients/verifypasswordtoken?token=' + param)

            .then((response) => response.json())
            .then(responseData =>{

                this.setState(
                    {
                        client: responseData
                    }
                )

                console.log("data")
                console.log(this.state.client)

            })
            .catch(err => console.error("Error occured here"));
    }

    componentDidMount() {


        this.verifyToken()
    }


    handleEdit = (data) => {

        const url = "http://localhost:8081/api/clients/" + this.state.client.id

        fetch(url, {
            crossOrigin: true,
            method: 'PUT', // or ‘PUT’
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => {

                if(res.status ===202) {

                    this.setState({

                        isSuccessful:true
        
                    })
                    
                }
            })
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response))

    }

    handleSubmit = () => {

        var password = { password: this.state.password, };
        this.handleEdit(password)

        return(<div>

            <Redirect to="/login"/>
        </div>)
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    render() {

        if(this.state.client.status === 400){
        return (

            <div>
                <h3>Invalid token</h3>
                <Redirect to="/login"/>
            </div>
        );
        }


        if(this.state.isSuccessful){

            return(

                <Redirect to="/login"/>

            )
        }

        else{
            return(
                <section class="signup">
                <div class="container">
                    <div class="signup-content">
                        <div class="signup-form">
                            <h2 class="form-title">Change Password</h2>
                            <form class="register-form" id="register-form">
                
                                <div class="form-group">
                                    <label for="email"><i class="zmdi zmdi-lock"></i></label>
                                    <input type='password' placeholder="Password"  name='password' onChange={this.handleChange} />
                                </div>
                
                                <div class="form-group">
                                    <label for="email"><i class="zmdi zmdi-lock"></i></label>
                                    <input type='password' placeholder="Re-type Password"  name='passwordRepeat' onChange={this.handleChange} />
                                </div>

                                <div class="form-group form-button">
                                <button type="submit" class="btn btn-primary btn-lg" onClick={this.handleSubmit}>Submit </button>
                            </div>
                            </form>                
                
                        </div>
                       
                    </div>
                </div>
                </section>
                

            )
        }
    }
}

function params(path) {


    return new URLSearchParams(path).get("token")
}

