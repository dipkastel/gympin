import React, {Component} from 'react';
import "./Sidebar.css";
import {Home, LineStyle, Timeline, TrendingUp} from "@material-ui/icons";
import { Link } from "react-router-dom";

  class Sidebar extends Component{
      componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
          console.log("sidebar update")
      }
        componentDidMount() {
            console.log("sidebar mount")
        }

      private MenuChange(e:any) {
          const el1 = document.querySelectorAll('.sidebarListItem');
          el1.forEach((item)=>{
              item.className = "sidebarListItem";
          });
          e.target.className +=" active";
      }
      render(){
        return (
            <div className="sidebar">
                <div className="sidebarWrapper">
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Dashboard</h3>
                        <ul className="sidebarList">
                            <Link to="/" onClick={this.MenuChange} >
                                <li className="sidebarListItem active">
                                    <Home className="sidebarIcon"/>
                                    home
                                </li>
                            </Link>

                            <Link to="/user/4" onClick={this.MenuChange}>
                                <li className="sidebarListItem">
                                    <Timeline className="sidebarIcon"/>
                                    profile
                                </li>
                            </Link>
                            <Link to="/users" onClick={this.MenuChange}>
                                <li className="sidebarListItem">
                                    <TrendingUp className="sidebarIcon"/>
                                    users
                                </li>
                            </Link>

                        </ul>
                    </div>
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Dashboard</h3>
                        <ul className="sidebarList">

                            <Link to="/places" onClick={this.MenuChange}>
                                <li className="sidebarListItem">
                                    <TrendingUp className="sidebarIcon"/>
                                    places
                                </li>
                            </Link>

                            <Link to="/users" onClick={this.MenuChange}>
                                <li className="sidebarListItem">
                                    <TrendingUp className="sidebarIcon"/>
                                    users
                                </li>
                            </Link>

                            <Link to="/users" onClick={this.MenuChange}>
                                <li className="sidebarListItem">
                                    <TrendingUp className="sidebarIcon"/>
                                    users
                                </li>
                            </Link>

                        </ul>
                    </div>
                </div>
            </div>
        );
    }

  }
export default Sidebar;
