import React from 'react'
import "./topbar.css"
import {NotificationsNone,Language,Settings,MeetingRoom} from "@material-ui/icons"
import Pocket from "../../helpers/pocket/Pocket";



export default function Topbar({onLogout}:any){
    return (
        <div className="topbar">
            <div className="topbarWraper">
                <div className="topRight">
                    <span className="logo">
                        پیشخوان جیم پین
                    </span>
                </div>
                <div className="topLeft">
                    <div className="topbarIconContainer">
                        <NotificationsNone/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings/>
                    </div>
                    <div className="topbarIconContainer" onClick={onLogout}>
                        <MeetingRoom/>
                    </div>
                    <img src="https://images.pexels.com/photos/7645829/pexels-photo-7645829.jpeg?auto=compress&cs=tinysrgb&h=300&w=400" alt="user" className="topAvatar"/>
                </div>
            </div>
        </div>
    )
}
