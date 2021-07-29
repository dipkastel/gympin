import React, {Component} from 'react'
import Topbar from "./topbar/Topbar";
import Getmail from "./getmail/Getmail";
import Logo from "./logo/Logo";
import Menu from "./menu/Menu";
import  "./navbar.css";
import UserMenu from "./userMenu/UserMenu";
import GetmailDesc from "./getmail/GetmailDesc";

class Navbar extends Component {

    render(){
        return (
            <React.Fragment>
                <div className="navv">
                    <div className="container">
                        <div className="row">
                            <Topbar />
                            <Getmail/>
                            <Logo/>
                        </div>
                    </div>
                </div>


                <GetmailDesc/>


                <nav className="navbar">
                    <div className="container">
                        <div className="row">
                            <Menu/>
                            <UserMenu/>
                        </div>
                    </div>
                </nav>


            </React.Fragment>
        )
    }

}

export default Navbar;
