import React from 'react';
import CounselingBase from "../Base/CounselingBase";

const CounselingManagementBaseTab = ({counseling,updateCounseling}) => {
    return (
        <>
            {counseling && <div className="row">

                <div className="col-md-12">
                    {counseling && <CounselingBase counseling={counseling} updateCounseling={updateCounseling}/>}
                </div>

            </div>}
        </>
    );
};

export default CounselingManagementBaseTab;
