import React from 'react'
import SkyLight from 'react-skylight'
import styles from '../client_style.css'

//React Component for editing clients name, address and phone number
class EditFields extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            address: '',
            phoneNumber:''
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
        var address = { address: this.state.address, 
                        name: this.state.name,
                        phoneNumber:this.state.phoneNumber};
        this.props.handleEdit(address);
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
                                
                                <input type='text' class="form-control input-a" placeholder="address" defaultValue={this.props.data.address} name='address' onChange={this.handleChange} />
                            </div>
                            <div class="form-group mb-3">
                                
                                <input type='text' class="form-control input-a" placeholder="name" defaultValue={this.props.data.name} name='name' onChange={this.handleChange} />
                            </div>
                            <div class="form-group">
                                
                                <input type='text' class="form-control input-a" placeholder="phoneNumber" defaultValue={this.props.data.phoneNumber} name='phoneNumber' onChange={this.handleChange} />
                            </div>


                            <button onClick={this.handleSubmit} type="Submit" class="btn btn-success">Save</button>
                            <button onClick={this.cancelSubmit} class="btn btn-danger ml-3">Cancel</button>
                        </form>
                    </div>
                </SkyLight>
                <div>
                        
                            <div onClick={() => this.refs.addDialog.show()} class="card eqh round-small card-default">
                                <div class="card-body text-center">
                                    <i class="fas fa-user-edit col bigicon mb-3"></i>
                                    <p>Edit profile</p>
                                </div>
                            </div>
        


                </div>
            </div>
        );
    }
}
export default EditFields;