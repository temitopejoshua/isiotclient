import React from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component{
    render(){
        return(
        <div className="not_found">
        <div className="not_found_text container">
        <h1>Not Found</h1>
        <Link to="/home">Return to home page</Link>
        </div>
        </div>
        );
    }

}