import React from 'react'
import SkyLight from 'react-skylight'
import { Redirect } from 'react-router-dom'
import { ThemeProvider } from 'react-bootstrap';


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
                    <form>

                        <input type='text' placeholder="address" defaultValue={this.props.data.address} name='address' onChange={this.handleChange} />
                        <input type='text' placeholder="name" defaultValue={this.props.data.name} name='name' onChange={this.handleChange} />
                        <input type='text' placeholder="phoneNumber" defaultValue={this.props.data.phoneNumber} name='phoneNumber' onChange={this.handleChange} />


                        <button onClick={this.handleSubmit} type="Submit">Save</button>
                        <button onClick={this.cancelSubmit}>Cancel</button>
                    </form>
                </SkyLight>
                <div>
                <button  style={{backgroundColor:'Transparent', border:'none'}}
                        onClick={() => this.refs.addDialog.show()}><i class="fas fa-user-edit icon"  ></i>
                        </button>


                </div>
            </div>
        );
    }
}
export default EditFields;