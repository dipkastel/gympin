import React from 'react';
import PlaceSells from "../sells/PlaceSells";

const CounselingManagementSellTab = ({place}) => {


    return (
        <>
            {place && <div className="row">
                <div className="col-md-12">
                    <PlaceSells place={place} />
                </div>
            </div>}
        </>
    );
};

export default CounselingManagementSellTab;
