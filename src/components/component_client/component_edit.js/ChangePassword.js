import React from 'react'
import SkyLight from 'react-skylight'



class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',

        }
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    // Save Password and close modal form
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
                    <div class="p-5">
                        <form>
                            <div class="form-group">
                                <input type='password' class="form-control input-a" placeholder="Password" name='password' onChange={this.handleChange} />
                            </div>

                            <div class="form-group">
                                <input type='password' class="form-control input-a" placeholder="Re-type Password" name='passwordRepeat' onChange={this.handleChange} />
                            </div>

                            <div class="form-group">
                                <button class="btn btn-success" onClick={this.handleSubmit} type="Submit">Save</button>
                                <button class="btn btn-danger ml-3" onClick={this.cancelSubmit}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </SkyLight>
                <div>
                    <div onClick={() => this.refs.addDialog.show()} class="card eqh round-small card-default">
                        <div class="card-body text-center">
                            <i class="fas fa-unlock-alt col bigicon mb-3"></i>
                            <p>Change Password</p>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}
export default ChangePassword