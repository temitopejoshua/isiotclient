import React, {Component} from 'react';
import {Bar as DeviceBar} from 'react-chartjs-2';

class BarGraph extends Component{
    constructor(props){
        super(props);
        this.state={
            devices: [],
            chartData:{},
            cal:'',
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
                let number_tempSensor = [];
                let number_geoSensor = [];

                device_object.forEach(temp => {
                    label.push(new Date().getMonth()+1);
                    number_tempSensor.push(temp.id);

                    if(temp.name === "Temperature Sensor"){
                        console.log(temp.name);
                        number_tempSensor.push(number_tempSensor.length);
                        console.log(number_tempSensor.length);
                    }
                });

                device_object.forEach(geo => {

                    if(geo.name === "Geolocation Sensor"){

                        console.log(geo.name);
                        number_geoSensor.push(number_geoSensor.length);
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
                                    data: number_geoSensor,
                                    }
                                ]
                    }
                });
            })
            .catch(err => console.error(err));
    }
    getCal =() =>{
        var month = new Date().getMonth()+1;
        var date = new Date().getDate();
        var year = new Date().getFullYear();
        var cal = month + "/"+ date+"/"+ year
        this.setState({ cal: cal })
        }

    componentDidMount() {
        this.fetchDevices();
        this.getCal();
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