
import React from 'react'
import Home from './AdminHome'
export default class Login extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            emailAddress: '',
            password: '',
            isAuthenticated: false,

        }


    }

    handleChange = (event) => {

        this.setState(
            { [event.target.name]: event.target.value }
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
            })
            .catch(err => console.error(err))
    }





    render() {

        if(sessionStorage.getItem("isAuthenticated") === 'true'){

        return <div> 
                <Home/>
            </div>
        }
        else{
        return (
            <div className="App">
                <form>
                    <input type='text' placeholder='Enter email' name='emailAddress' onChange={this.handleChange}></input>
                    <input type='password' placeholder='Enter Password' name='password' onChange={this.handleChange}></input>
                </form>
                <button onClick={this.login}>Login</button>
            </div>
        );

        }
    }
}