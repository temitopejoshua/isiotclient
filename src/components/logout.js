import React from 'react'
import { Redirect } from 'react-router-dom'


export default class Logout extends React.Component {

    logout = () => {

        const tokenR = window.sessionStorage.getItem("jwt");        
        sessionStorage.removeItem("jwt");
        sessionStorage.removeItem("isAuthenticated")

    }

    componentWillMount() {

      this.logout();
    }



    render() {

        return <Redirect to="/login" />
    }

}