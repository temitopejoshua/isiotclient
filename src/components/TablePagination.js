import React, {Component} from 'react';
import Devices from './Devices';
import axios from 'axios';
import Pagination from 'react-js-pagination';
require("bootstrap-less/bootstrap/pagination.less");




export default class TablePagination extends Component{
    constructor(){
        super();
        this.state ={
            devices:[],
            activePage: 10
        };
    }

    componentDidMount(){
        axios.get("http://localhost:8081/api/devices/")
        .then(response =>{
            this.setState({devices:response.data});
        })
    }

    handlePageChange(pageNumber){
        this.setState({activePage: pageNumber});
    }

    render(){
        const devices=this.state.devices.map(device=> (
            <Devices ID={device.ID} devicename={device.name}/>));
        return(
            <div>
                <div className="pagination">
                    Total Devices: {devices.length}
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={100}
                    totalItemsCount={devices.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                    />
                    <div>{devices}</div>
                </div>
            </div>
        );
    }
}