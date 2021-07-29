import React, {Component} from 'react'
import BottomBox from "./BottomBox/BottomBox";
import CopyWrite from "./CopyWrite/CopyWrite";
import "./Footer.css"


class Footer extends Component {

    render(){
        return (
            <>
                <BottomBox/>
                <CopyWrite/>
            </>

        )
    }

}

export default Footer;
