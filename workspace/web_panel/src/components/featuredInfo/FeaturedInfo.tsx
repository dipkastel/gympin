import React from "react";
import "./FeaturedInfo.css"
import {ArrowDownward,ArrowUpward} from "@material-ui/icons";

export default function FeaturedInfo(){
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Revanue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">2500</span>
                    <span className="featuredMoneyRate">-11.5 <ArrowDownward className="featuredIcon negative"/></span>
                </div>
                <span className="featureSub">compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">4200</span>
                    <span className="featuredMoneyRate">4.5 <ArrowUpward className="featuredIcon"/></span>
                </div>
                <span className="featureSub">compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">6500</span>
                    <span className="featuredMoneyRate">11 <ArrowUpward className="featuredIcon "/></span>
                </div>
                <span className="featureSub">compared to last month</span>
            </div>
        </div>
    )
}
