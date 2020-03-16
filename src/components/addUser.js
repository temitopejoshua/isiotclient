import React from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router-dom'





export default class AddUser extends React.Component {



    constructor(props) {
        super(props);

        this.state = {
            emailAddress: '',
            password: '',
            phoneNumber: '',
            firstName: '',
            lastName: '',
            address: '',
            registrationResponse: {},
            isRegistered: false,
            loading: true
        }
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value ,
            
            }
        );
        
        if(this.state.emailAddress.length < 5){

            this.setState({loading:true})
        }
      else{

        this.setState({loading:false})
      }

    }

    addUser = (event) => {

        event.preventDefault();    

        const user = {
            emailAddress: this.state.emailAddress,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address
            
        };

        fetch('http://localhost:8081/api/users/',
            {
                crossDomain: true,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            .then((response) => {


                if(response.status===201){
                this.setState({
                    isRegistered: true,
                    registrationResponse: response.json


                })}

            })          
            .catch((err) => {
                console.error(err);
            });

         

    }

    render() {


        const {loading} = this.state.loading

        if (this.state.isRegistered) {

        return (
        <div>
            <h1>Account verification email has been sent to {this.state.emailAddress} kindly</h1> 
        
        
                    </div>)
        }

        else {
            return (


                <div>
                    <form method='POST'>
                        <input placeholder="First Name" name="firstName" onChange={this.handleChange}></input>
                        <input placeholder="Last Name" name="lastName" onChange={this.handleChange}></input>
                        <input type='email' required name='emailAddress' required placeholder="Email Address" onChange={this.handleChange}></input>
                        <input type='password' required name='password' required placeholder="Password" onChange={this.handleChange}></input>
                        <input type='text' name='phoneNumber' placeholder="Phone Number" onChange={this.handleChange}></input>
                        <input type='text' name='address' placeholder="Home or Office Address" onChange={this.handleChange}></input>
                        <button type="submit" className="button" onClick={this.addUser} disabled={this.state.loading}>Register
                        {loading && < i className="fa fa-refresh fa-spin"></i>}
                        
                        
                        </button>

                    </form>




                </div>
            );

        }

    }
}



