import React from 'react';
import CateringBase from "../Base/CateringBase";

const CateringManagementCateringTab = ({catering,update}) => {
    return (
        <>

            {catering && <div className="row">
                <div className="col-md-12">
                    {catering && <CateringBase catering={catering} updateCatering={update}/>}
                </div>
            </div>}

        </>
    );
};
export default CateringManagementCateringTab;
