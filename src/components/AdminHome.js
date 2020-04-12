import React from 'react'
import { Link } from 'react-router-dom'
import  { Redirect } from 'react-router-dom'




export default class AdminHome extends React.Component {



    constructor(props) {

        super(props)
        this.state = {
            users: [],
        }
    }

    fetchUsers = () => {
        // Read the token from the session storage
        // and include it to Authorization header
        const token = window.sessionStorage.getItem("jwt");

        console.log(token)
        fetch('http://localhost:8081/api/clients',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    users: responseData._embedded.clients,
                });
            })
            .catch(err => console.error(err));
    }

    componentDidMount() {

        this.fetchUsers()


    }

    render() {


        const dt = this.state.users.map(

            (user, index) =>

                <div>
                    <Link to={"/clients/" + user.id}> <p>{user.emailAddress}</p></Link>

                </div>

        )

        if(sessionStorage.getItem("isAdmin") !== 'true'){

            return <Redirect to="/admin"/>
            }

            else{
        return (

            <div>

                {dt}
            </div>
        );

            }
    }


}


