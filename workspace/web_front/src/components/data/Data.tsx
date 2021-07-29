import React, {Component} from 'react'
import "./Data.css"
import Filter from "./Filter/Filter";
import Grid from "./Grid/Grid";


class Data extends Component {

    render(){
        return (
            <div className="container">
                <Filter/>
                <Grid/>
            </div>

        )
    }

}

export default Data;
