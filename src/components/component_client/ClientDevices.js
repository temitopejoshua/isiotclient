import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import styles from './client_style.css'
import GoogleApiWrapper from './Map'
import { PaginatedList } from 'react-paginated-list'
import BounceLoader from 'react-spinners/BounceLoader'
import SideNav from './SideNav'
import UploadDevice from '../component_admin/UploadDevice'






export default class ClientDevices extends React.Component {



    constructor(props) {

        super(props)
        this.state = {
            client: {},
            loading: true,
            devices: [
                {
                    name: "Test1",
                    category: {
                        name: "Test"
                    }

                },
                {
                    name: "Test2",
                    category: {
                        name: "Test"
                    }

                },
                {
                    name: "Test3",
                    category: {
                        name: "Test"
                    }

                },
                {
                    name: "Test4",
                    category: {
                        name: "Test"
                    }

                },
                {
                    name: "Test5",
                    category: {
                        name: "Test"
                    }

                },
                {
                    name: "Test6",
                    category: {
                        name: "Test"
                    }

                },
                {
                    name: "Test7",
                    category: {
                        name: "Test"
                    }

                },
                {
                    name: "Test8",
                    category: {
                        name: "Test"
                    }

                },
                {
                    name: "Test9",
                    category: {
                        name: "Test"
                    }

                },
                {
                    name: "Test10",
                    category: {
                        name: "Test"
                    }

                },
                {
                    name: "Test11",
                    category: {
                        name: "Test"
                    }

                },
                {
                    name: "Test12",
                    category: {
                        name: "Test"
                    }

                }
            ],

        }
    }

    fetchUsers = () => {
        // Read the token from the session storage
        // and include it to Authorization header
        const token = window.sessionStorage.getItem("jwt");

        fetch('http://localhost:8081/api/clients/access',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    client: responseData,
                    devices: responseData.devices,
                    loading: false
                });
            })
            .catch(err => console.error(err));
    }


    componentDidMount() {

        this.fetchUsers()


    }

    render() {

        const tableData = <PaginatedList
            list={this.state.devices}
            itemsPerPage={5}
            renderList={(list) => (
                <div row deviceTable>
                    <table class="table table-bordered serial text-center">
                        <thead class="tableHead">
                            <tr>
                                <th scope="col">S/N</th>
                                <th scope="col">Name</th>
                                <th scope="col">Device Type</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        {list.map((device, index) => {

                            return (
                                <tr key={index}>
                                    <td></td>
                                    <td>{device.name}</td>
                                    <td>{device.category.name}</td>
                                    <Link to={"/device/" + device.devEui}>view</Link>

                                </tr>

                            );
                        })}
                    </table>
                </div>
            )}

        />



        if (sessionStorage.getItem("isAuthenticated") !== 'true') {

            return <Redirect to="/login" />
        }


        else {
            return (


                <div>
                   <div>
                    <SideNav/>
                </div>

                    <div class="main">

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
                            <div class="col-12 otherSec">
                                <div class="row mapMargin">
                                    <div class="col-md-12">
                                        <GoogleApiWrapper />
                                    </div>
                                </div>
                                <div className="mb-5">
                                <UploadDevice/>
                                </div>
                                <div>
                                    {tableData}
                                </div>
                                

                            </div>
                        </div>
                    </div>

                </div>

            );

        }
    }


}




