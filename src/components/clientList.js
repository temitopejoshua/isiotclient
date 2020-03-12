import React, {Component} from 'react';
import {Doughnut as DeviceDougnut} from 'react-chartjs-2';

export default class Clients extends Component{
    constructor(props){
        super(props);
        this.state={
            chartData:{
                labels: ["Assigned devices", "Unassigned devices"],
                datasets: [{
                    data: [300, 150],
                    backgroundColor: ["#FF6384", "#36A2EB"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB"]
                }]
            }
        }
    };

render(){

    const styles ={
        graphContainer :{
            // border: '5px solid blue',
            padding: '15px',
            width: '300px'
        }
    }
    return(
        <div style={styles.graphContainer}>
            <DeviceDougnut
            data={this.state.chartData}
            options={{
                maintainAspectRatio: false
            }}
            />
        </div>
    )
}
}