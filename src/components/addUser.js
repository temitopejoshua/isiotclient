import React from 'react'
import ReactDOM from 'react-dom'

export default class AddUser extends React.Component {

    render() {
        return (
            <div>
               <form>
                    <h3 className="text-center">Create Account</h3>
                    <div className="form-group">
                    <label>First Name</label>
                   <input placeholder="First Name" name ="firstName" className="form-control"></input>
                   </div>
                   <div className="form-group">
                    <label>Last Name</label>
                   <input placeholder="Last Name" name = "lastName" className="form-control"></input>
                   </div>
                   <div className="form-group">
                    <label>Email Address</label>
                   <input type='email' required name = 'emailAddress' placeholder="Email Address" className="form-control"></input>
                   </div>
                   <div className="form-group">
                    <label>Password</label>
                   <input type='password' required name='password' placeholder="Password" className="form-control"></input>
                   </div>
                   <input type="submit" className="btn btn-primary btn-block"></input>
               </form>
            </div>
        );
    }
}



