import React,{Component} from 'react'
import SkyLight from 'react-skylight'



export default class AssignDevice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            device: {},
            client: {}
        }
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    // Save details
    handleSubmit = (event) => {
        event.preventDefault();
        var details = { device: this.state.device,
                        client: this.state.client
                        };
        this.props.handleEdit(details);
        this.refs.addDialog.hide();
        this.props.fetchData()
        
    }

    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.addDialog.hide();
        this.props.fetchData()

    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="addDialog">
                    <form className="">
                        <h4 className="text-center">Edit Device Information</h4>
                        <label>Client ID</label>
                        <input type='text' className="form-control" placeholder="Enter Name" defaultValue={this.props.data.client} name='name' onChange={this.handleChange} /><br/>
                        <label>Device ID</label>
                        <input type='text' className="form-control" placeholder="Enter Device Eui" defaultValue={this.props.data.device} name='devEui' onChange={this.handleChange} /><br/><hr/>
                        <div className="text-center">
                        <button onClick={this.cancelSubmit} className="btn btn-danger modal-btn">Cancel</button>
                        <button onClick={this.handleSubmit} type="Submit" className="btn btn-primary modal-btn">Save</button>
                        </div>
                    </form>
                </SkyLight>
                <div>
                <button onClick={() => this.refs.addDialog.show()} className="btn btn-primary">Assign Device</button>
                </div>
            </div>
        );
    }
}

