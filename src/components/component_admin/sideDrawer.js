import React, {Component} from 'react';
import SideNav, {NavItem,NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {Nav} from 'react-bootstrap';





export default class SideDrawer extends Component{
    
    openNav = () => {
        document.getElementById("main").style.marginLeft = "250px";
      }

    render(){
        return(
           
            <div>
                <SideNav onSelect={(selected)  => {

                }}>
                    <SideNav.Toggle/>
                    <SideNav.Nav defaultSelected="home">
                        <NavItem eventKey="home">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{fontSize: '1.7em' }}/>
                            </NavIcon>
                            <NavText><Nav.Link href="/">Home</Nav.Link></NavText>
                        </NavItem>
                        <NavItem eventKey="map">
                            <NavIcon>
                                <i className="fa fa-fw fa-users" style={{fontSize: '1.7em' }}/>
                            </NavIcon>
                            <NavText><Nav.Link href="/maps">Maps</Nav.Link></NavText>
                        </NavItem>
                        <NavItem eventKey="/clients">
                            <NavIcon>
                                <i className="fa fa-fw fa-users" style={{fontSize: '1.7em' }}/>
                            </NavIcon>
                            <NavText><Nav.Link href="/clients">Clients</Nav.Link></NavText>
                        </NavItem>
                        <NavItem eventKey="charts">
                            <NavIcon>
                                <i className="fa fa-fw fa-line-chart" style={{fontSize: '1.7em' }}/>
                            </NavIcon>
                            <NavText><Nav.Link href="/devices">Devices</Nav.Link></NavText>
                        </NavItem>
                        <NavItem eventKey="/settings">
                            <NavIcon>
                                <i className="fa fa-fw fa-line-chart" style={{fontSize: '1.7em' }}/>
                            </NavIcon>
                            <NavText>Profile</NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            </div>

//     <div>
//     <Router>
//     <Route render={({ location, history }) => (
//         <React.Fragment>
//             <SideNav
//             </SideNav>
//             <main>
//                 {/* <Route path="/userdetails" component={UserDetail}/> */}
//                 {/* <Route path="/" exact component={props => <RootComponent />} /> */}
//                 {/* <Route path="/home" component={props => <Home />} />
//                 <Route path="/devices" component={props => <Devices />} /> */}
//             </main>
//         </React.Fragment>
//     )}
//     />
// </Router>
//             </div>
        );
    }
}
