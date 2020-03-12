import React from 'react'


export default class Home extends React.Component {
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
        fetch('http://localhost:8081/api/users',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    users: responseData,
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
                <p>{user.emailAddress + user.firstName + user.lastName}</p> 
            </div>
        )
        return (
            <div>
                <h1>Admin home</h1>
                {dt}
            </div>
        );
    }


}