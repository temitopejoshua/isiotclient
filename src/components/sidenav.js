import React, {Component} from 'react';
import './sidenav.css';


export default class SideNav extends Component{

    openNav = () =>{
    document.getElementById("mySidenav").style.width = "250px";
    }

    closeNav =() => {
    document.getElementById("mySidenav").style.width = "0";
    }

    render(){

        const myStyle ={
            cursor: "pointer",
            fontSize: "30px"
        }
        return(
            <div>
            <div id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="/clients">Clients</a>
            <a href="#">Contact</a>
          </div>
          <div>
            <div><span style={myStyle} onClick="openNav">&#9776; Open</span></div>
        </div>
        </div>
        );
    }
}