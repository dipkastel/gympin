import React from 'react';
import "./Sidebar.css";
import {Home, LineStyle, Timeline, TrendingUp} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar(){
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" >
                        <li className="sidebarListItem active">
                            <Home className="sidebarIcon"/>
                            home
                        </li>
                        </Link>

                        <Link to="/user/4" >
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon"/>
                            profile
                        </li>
                        </Link>
                        <Link to="/users" >
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
                    <li className="sidebarListItem">
                        <Timeline className="sidebarIcon"/>
                        analytics
                    </li>

                    <li className="sidebarListItem">
                        <TrendingUp className="sidebarIcon"/>
                        sales
                    </li>

                    <li className="sidebarListItem">
                        <LineStyle className="sidebarIcon"/>
                        bricks
                    </li>

                </ul>
            </div>
            </div>
        </div>
    );
}
