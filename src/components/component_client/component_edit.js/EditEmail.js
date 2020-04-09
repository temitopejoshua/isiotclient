import React from 'react'
import SkyLight from 'react-skylight'
import { Redirect } from 'react-router-dom'


class EditEmail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailAddress: '',
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
        var newEmail = { emailAddress: this.state.emailAddress };
        this.props.handleEdit(newEmail);
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

                        <input type='text' placeholder={this.props.placeholder} name='emailAddress' onChange={this.handleChange} defaultValue={this.props.data.emailAddress}/>
                        <button onClick={this.handleSubmit} type="Submit">Save</button>
                        <button onClick={this.cancelSubmit}>Cancel</button>
                    </form>
                </SkyLight>
                <div>
                    <button  class="btn btn-outline-info"
                        onClick={() => this.refs.addDialog.show()}>Edit</button>


                </div>
            </div>
        );
    }
}
export default EditEmail;