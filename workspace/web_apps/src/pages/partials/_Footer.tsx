import React from 'react';
import {Image} from "react-bootstrap";
import {toAbsoluteUrl} from "../../utils/utils";

const _Footer = () => {
    return (
        <div className={"footer"}>
            <Image src={toAbsoluteUrl("/assets/images/footer.jpg")} className={"inCardImage"} />
        </div>
    );
};

export default _Footer;
