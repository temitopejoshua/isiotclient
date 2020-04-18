import React from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component{
    render(){

        if (sessionStorage.getItem("isAdmin") === 'true') {
            return(
                <div className="not_found">
                    <div className="not_found_text container">
                        <Link to="/admin/home"> <button  className="btn btn-primary">Return to Home Page</button></Link>
                    </div>
                </div>
            );
        }else{

        return(
        <div className="not_found">
            <div className="not_found_text container">
                <Link to="/home"> <button  className="btn btn-primary">Return to Home Page</button></Link>
            </div>
        </div>
        );
    }
    }
}