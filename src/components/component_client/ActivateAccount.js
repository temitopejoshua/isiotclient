import React from 'react'
import { Redirect } from 'react-router-dom'
export default class ActivateAccount extends React.Component {


    constructor(props) {

        super(props)
        this.state = {

            isActivated: false

        }

    }


    verifyAccount = () => {

        const param = params(window.location.search)

        fetch('http://localhost:8081/api/clients/verify?token=' + param)

            .then((response) => {

                if (response.status === 202) {

                    this.setState(
                        {
                            isActivated: true
                        }
                    )
                }


            })
            .catch(err => console.error(err));
    }

    componentWillMount() {


        this.verifyAccount()
    }


    render() {

        if (this.state.isActivated) {
            return (

                <div>
                    <h1>Account Activated Successfully</h1>
                    <Redirect to = "/login"/>


                </div>
            );
        }

        else {

            return (

                <div>
                    <h1>Invalid Activation Token</h1>

                </div>
            );

        }
    }

}

function params(path) {


    return new URLSearchParams(path).get("token")
}