import React, {Component} from 'react';

export default class CurrentTime extends Component{

    constructor(props){
        super(props);
        this.state={
            curTime : '',
        };
    }

    componentDidMount(){
        var minutes = new Date.getMonth();

        this.setState({ curTime: minutes })
    }

    rennder(){
        return(
            <div>
                {this.state.curTime}
            </div>
        );
    }
}
