import React from 'react'
import { Link } from 'react-router-dom'
import  { Redirect } from 'react-router-dom'




export default class AdminHome extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            user: {},
        }
    }

    fetchUsers = () => {
        // Read the token from the session storage
        // and include it to Authorization header
        const token = window.sessionStorage.getItem("jwt");

        fetch('http://localhost:8081/api/userhome',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    user: responseData,
                });
            })
            .catch(err => console.error(err));
    }

    componentDidMount() {

        this.fetchUsers()
    }

    render() {      
        if(sessionStorage.getItem("isAuthenticated") !== 'true'){

            return <Redirect to="/login"/>
            }

            else{
        return (

            <div>

        <h1>{this.state.user.firstName}</h1>
        <h1>{this.state.user.lastName}</h1>
        <h1>{this.state.user.emailAddress}</h1>
            </div>
        );

            }
    }


}


