import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import BounceLoader from 'react-spinners/BounceLoader'
import SERVER_URL from '../ServerUrl'

export default class ActivateAccount extends React.Component {


    constructor(props) {

        super(props)
        this.state = {

            loading: true,

        }

    }


    verifyAccount = () => {

        const param = params(window.location.search)

        fetch(SERVER_URL + '/api/clients/verify?token=' + param)

            .then((response) => {

                if (response.status === 202) {

                    this.setState(
                        {
                            isActivated: true,
                            loading: false,
                            info: 'Your account has been activated successfully'
                        }
                    )
                }

                else {

                    this.setState({

                        info: 'Your account cannot be activated \n, Invalid token',
                        loading: false
                    })
                }


            })
            .catch(err => console.error(err));
    }

    componentWillMount() {


        this.verifyAccount()
    }



    render() {

        const loginLink = <Link to="/login">Login here</Link>

        return ((

            <div>

                <div class="loaderTemp" hidden={!this.state.loading}>

                    <div>
                        <BounceLoader

                            size={100}
                            color={"grey"}
                            loading={this.state.loading}

                        />
                    </div>

                </div>

                <div hidden={this.state.loading}>
                    <div class="container mt-3">
                        <div class="row">
                            <div class="col-md-12 no-border">
                                <div class="card card-s">
                                    <div class="card-body">
                                        <h5>{this.state.info}</h5>

                                        {loginLink}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


        ));

    }



}
//Function that gets parameter token from the url
function params(path) {
    return new URLSearchParams(path).get("token")
}