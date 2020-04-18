import React from 'react'
import SkyLight from 'react-skylight'
import { Redirect } from 'react-router-dom'
import { ThemeProvider } from 'react-bootstrap';


class EditUserFields extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            phoneNumber:'',
            address: '',
        }
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    // Save Email and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
        var details = { name: this.state.name,
                        phoneNumber:this.state.phoneNumber,
                        address: this.state.address};
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
                    <div class="p-5">
                        <form class="form">
                            <div class="form-group mb-3">
                                <input type='text' class="form-control input-a" placeholder="Enter Name" defaultValue={this.props.data.name} name='name' onChange={this.handleChange} />
                            </div>
                            <div class="form-group mb-3">
                                <input type='text' class="form-control input-a" placeholder="Enter PhoneNumber" defaultValue={this.props.data.phoneNumber} name='phoneNumber' onChange={this.handleChange} />
                            </div>
                            <div class="form-group">
                                <input type='text' class="form-control input-a" placeholder="Enter Address" defaultValue={this.props.data.address} name='address' onChange={this.handleChange} />
                            </div>
                            <button onClick={this.cancelSubmit} class="btn btn-danger">Cancel</button>
                            <button onClick={this.handleSubmit} type="Submit" class="btn btn-success  ml-3">Save</button>
                        </form>
                    </div>
                </SkyLight>
                <button
                        onClick={() => this.refs.addDialog.show()} className="btn btn-primary">Edit Profile
                </button>
            </div>
        );
    }
}
export default EditUserFields;