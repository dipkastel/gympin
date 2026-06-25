import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {Report_getLinkViews} from "../../../network/api/report.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const _LinkViewsModal = ({linkId,setLinkId}) => {

    const error = useContext(ErrorContext);
    const [report,setReport] = useState(null);

    useEffect(() => {
        if(linkId)
            getLinkReport()
    }, [linkId]);

    function getLinkReport(){
        setReport(null);
        Report_getLinkViews({id:linkId}).then(result=>{
            setReport(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }



    return (
        <div>

            <Modal show={linkId!=null} onHide={() => setLinkId(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>{"گزارش لینک"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {report&&<LineChart
                        style={{width: '100%', height: '100%', maxHeight: '30vh'}}
                        responsive
                        data={report}
                        margin={{
                            top: 5,
                            right: 5,
                            left: 5,
                            bottom: 5,
                        }}
                    >
                        <XAxis  dataKey="Date"/>
                        <YAxis width="Count"/>
                        <Tooltip/>
                        <Legend/>
                        <Line type="monotone" dataKey="ViewCount" stroke="#8884d8" activeDot={{r: 8}}/>
                    </LineChart>}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default _LinkViewsModal;
