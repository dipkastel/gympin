import React from 'react';
import _ChangeCateringStatus from "../status/_ChangeCateringStatus";

const CateringManagementSettingTab = ({catering, update}) => {
    return (
        <>
            {catering && <div className="row">

                <div className="col-md-6">
                    {catering && <_ChangeCateringStatus catering={catering} update={update}/>}
                    {/*{counseling && <PlaceOrder counseling={counseling} updateCounseling={updateCounseling}/>}*/}
                    {/*{counseling && <DeletePlace counseling={counseling}/>}*/}

                </div>
                <div className="col-md-6">
                    {/*{counseling && <PlaceContract counseling={counseling} updateCounseling={updateCounseling}/>}*/}
                    {/*{counseling && <PlaceQrMessages counseling={counseling}/>}*/}
                    {/*{counseling && <PlaceInviteCode counseling={counseling}/>}*/}
                </div>

            </div>}
        </>
    );
};

export default CateringManagementSettingTab;
