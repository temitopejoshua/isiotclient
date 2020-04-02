import React from 'react'
import SkyLight from 'react-skylight'
import { Redirect } from 'react-router-dom'
import { ThemeProvider } from 'react-bootstrap';


class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password:'',
            
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
        var password = { password: this.state.password, };
        this.props.handleEdit(password);
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

                        <input type='password' placeholder="Password"  name='password' onChange={this.handleChange} />
                        <input type='password' placeholder="Re-type Password"  name='passwordRepeat' onChange={this.handleChange} />


                        <button onClick={this.handleSubmit} type="Submit">Save</button>
                        <button onClick={this.cancelSubmit}>Cancel</button>
                    </form>
                </SkyLight>
                <div>
                    <button  style={{backgroundColor:'Transparent', border:'none'}}
                        onClick={() => this.refs.addDialog.show()}><i class="fas fa-unlock-alt col icon" ></i>
                        </button>


                </div>
            </div>
        );
    }
}
export default ChangePassword