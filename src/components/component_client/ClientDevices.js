import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import styles from './client_style.css'
import MapContainer from './Map'
import { PaginatedList } from 'react-paginated-list'
import BounceLoader from 'react-spinners/BounceLoader'
import SideNav from './SideNav';
import Deletedevice from './Deletedevice'
import UploadDevice from '../component_admin/UploadDevice'
import SERVER_URL from '../ServerUrl'


export default class ClientDevices extends React.Component {



    constructor(props) {

        super(props)
        this.state = {
            client: {},
            loading: true,
            devices: [],
            location: [
                { latitude: 47.359423, longitude: -122.021071 },
            ]

        }
    }

    fetchUsers = () => {
        // Read the token from the session storage
        // and include it to Authorization header
        const token = window.sessionStorage.getItem("jwt");

        fetch( SERVER_URL+ '/api/clients/access',
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
                                    <button class="btn btn-success"><Link to={"/device/" + device.devEui}>View </Link> </button>
                                    <button type="button" class="btn btn-danger ml-2" onClick={Deletedevice.bind(this, device.devEui)} >Delete</button>

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
                        <SideNav />
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
                                        <MapContainer location={this.state.location} />
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <UploadDevice />
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




