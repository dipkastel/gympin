import React from 'react';
import "./style.css"

const TicketLayout = (props) => {
    return (
        <div className={props.color}>
            <div className="ticket">
                <div className="widget --flex-column">
                    <div className="tco"></div>
                    <div className="top --flex-column">
                        <div className="deetz --flex-row-j!sb">
                            <div className="label">{props.children}</div>
                        </div>
                    </div>
                    <div className="bco"></div>
                </div>
            </div>
        </div>

    );
};

export default TicketLayout;
