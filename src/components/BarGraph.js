import React, {Component} from 'react';
import {Bar as DeviceBar} from 'react-chartjs-2';
import axios from 'axios';
import { getElementError } from '@testing-library/react';

class BarGraph extends Component{
    constructor(props){
        super(props);
        this.state={
            devices: [],
            chartData:{
                labels: ["January", "February", "March", "April", "May", "June", "July",
                        "August","September", "October", "November", "December"],
                datasets: [{
                    label: "Temperature Sensor",
                    backgroundColor: 'red',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 0, 0],
                    },
                    {
                    label: "Geolocation Sensor",
                    backgroundColor: 'blue',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 0, 0],
                    }
                    ]
            }
        }
    };

    fetchDevices = () => {
        // Read the token from the session storage
        // and include it to Authorization header
        const token = window.sessionStorage.getItem("jwt");
        fetch('http://localhost:8081/api/devices',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                const device_object = responseData._embedded.devices;
                let label = [];
                let numbers_temp = [];
                let numbers_geo = [];
                let numberOfGeoSensor = 0;

                device_object.forEach(temp => {
                    label.push(temp.id);
                    numbers_temp.push(temp.id);

                    if(temp.name === "Temperature Sensor"){
                        console.log(temp.name);
                        numbers_geo.push(numbers_temp.length);
                        console.log(numbers_temp.length);
                    }
                });

                device_object.forEach(geo => {

                    if(geo.name === "Geolocation Sensor"){

                        console.log(geo.name);
                        numbers_geo.push(numbers_geo.length);
                        console.log(numbers_geo);
                    }
                });

                this.setState({
                    numberOfDevices: responseData.page.totalElements,
                    chartData:{
                        labels: ["January", "February", "March", "April", "May", "June", "July",
                                "August","September", "October", "November", "December"],
                                datasets: [{
                                    label: "Temperature Sensor",
                                    backgroundColor: 'red',
                                    borderColor: 'rgb(255, 99, 132)',
                                    data: numbers_temp,
                                    },
                                    {
                                    label: "Geolocation Sensor",
                                    backgroundColor: 'blue',
                                    borderColor: 'rgb(255, 99, 132)',
                                    data: numbers_geo,
                                    }
                                ]
                    }
                });
            })
            .catch(err => console.error(err));
    }
    componentDidMount() {
        this.fetchDevices()
    }

render(){

    const styles ={
        graphContainer :{
            border: '2px solid blue',
            padding: '15px',
            height:'600px',
            backgroundColor: '',
        }
    }
    return(
        <div style={styles.graphContainer}>
            {/* <h5>2020 Device Allocation</h5> */}
            <DeviceBar
            data={this.state.chartData}
            options={{
            maintainAspectRatio: false
            }}
            />
        </div>
    )
}
}
export default BarGraph;