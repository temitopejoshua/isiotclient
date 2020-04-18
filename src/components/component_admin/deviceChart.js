import React, {Component} from 'react';
import {Doughnut as DeviceDougnut} from 'react-chartjs-2';
import SERVER_URL from '../ServerUrl';

class DeviceChart extends Component{
    constructor(props){
        super(props);
        this.state={
            chartData:{},
        }
    };

    fetchDevices = () => {
        // Read the token from the session storage
        // and include it to Authorization header
        const token = window.sessionStorage.getItem("jwt");
        fetch(SERVER_URL +'/api/devices',
            {
                headers: { 'Authorization': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                const device = responseData._embedded.devices;
                let assigned = [];
                let unassigned = [];

                device.forEach(dev => {
                    if(dev.assigned){
                        assigned.push(dev.id);
                    }
                    else{
                        unassigned.push(dev.id);
                    }
                });

                this.setState({
                    numberOfDevices: responseData.page.totalElements,
                    chartData:{
                        labels: ["Assigned", "Unassigned"],
                            datasets: [{
                                data: [assigned.length,unassigned.length],
                                backgroundColor: ["#FF6384", "#36A2EB"],
                                hoverBackgroundColor: ["#FF6384", "#36A2EB"]
                        }]
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
                <div className="card-body">
                    <div className="align-self-center chart chart-lg">
                    <div style={styles.graphContainer}>
                    <DeviceDougnut
                    data={this.state.chartData}
                    options={{
                    maintainAspectRatio: false,
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
export default DeviceChart;