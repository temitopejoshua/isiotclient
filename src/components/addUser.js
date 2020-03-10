import React from 'react'
import ReactDOM from 'react-dom'




export default class AddUser extends React.Component {

    render() {


        return (


            <div>
               <form>
                   <input placeholder="First Name" name ="firstName"></input>
                   <input placeholder="Last Name" name = "lastName"></input>
                   <input type='email' required name = 'emailAddress' placeholder="Email Address"></input>
                   <input type='password' required name='password' placeholder="Password"></input>
                   <input type="submit"></input>
               </form>
            </div>
        );
    }
}



