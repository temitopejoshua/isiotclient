import React, {Component} from 'react';
import {Bar as DeviceBar} from 'react-chartjs-2';
import SERVER_URL from '../ServerUrl';

class BarGraph extends Component{
    constructor(props){
        super(props);
        this.state={
            devices: [],
            chartData:{}
        }
    };

    fetchDevices = () => {
        // Read the token from the session storage
        // and include it to Authorization header
        const token = window.sessionStorage.getItem("jwt");
        fetch(SERVER_URL+ '/api/devices',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                const device_object = responseData._embedded.devices;
                let number_tempSensor = [];
                let number_geoSensor = [];

                device_object.forEach(temp => {
                    number_tempSensor.push(temp.id);

                    if(temp.name === "Temperature Sensor"){
                        console.log(temp.name);
                        number_tempSensor.push(temp.id);
                        console.log(number_tempSensor.length);
                    }
                });

                device_object.forEach(geo => {
                    if(geo.name === "Geolocation Sensor"){

                        console.log(geo.name);
                        number_geoSensor.push(geo.id);
                        console.log(number_geoSensor.length);
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
                                    borderColor: 'red',
                                    data: number_tempSensor,
                                    },
                                    {
                                    label: "Geolocation Sensor",
                                    backgroundColor: 'blue',
                                    borderColor: 'blue',
                                    data:number_tempSensor,
                                    }
                                ]
                    }
                });
            })
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.fetchDevices();
    }

render(){

    const styles ={
        graphContainer :{
            height:'400px',
        }
    }
    return(
        
        <div className="">
            <div className="card flex-fill w-100">
                <div className="card-header">
                    <div className="card-actions float-right">
                        <div className="dropdown show">
                        <a href="#">...</a>
                        </div>
                    </div>
                    <h5 className="card-title mb-0">2020 Device Allocation</h5>
                </div>
                <div className="card-body">
                    <div className="align-self-center chart chart-lg">
                    <div style={styles.graphContainer}>
                    <DeviceBar
                    data={this.state.chartData}
                    options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes:[{
                            gridLines: {
                                // display:false
                            },
                            ticks:{
                                stepSize:2
                            }
                        }],
                        xAxes:[{
                            gridLines: {
                                color: "transparent"
                            },
                        }],
                    }
                    }}
                    />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}
export default BarGraph;