import React from 'react'
import { Redirect } from 'react-router-dom'


export default class Logout extends React.Component {

    logout = () => {
        sessionStorage.removeItem("jwt");
        sessionStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("isAdmin");
        sessionStorage.removeItem("status");
    }
    componentWillMount() {
      this.logout();
    }

    render() {
        return <Redirect to="/login"/>
    }
}