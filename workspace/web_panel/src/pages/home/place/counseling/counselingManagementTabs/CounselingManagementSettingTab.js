import React from 'react';
import _ChangeCounselingStatus from "../status/_ChangeCounselingStatus";
const CounselingManagementSettingTab = ({counseling, updatePlace}) => {
    return (
        <>
            {counseling && <div className="row">

                <div className="col-md-6">
                    {counseling && <_ChangeCounselingStatus counseling={counseling} updatePlace={updatePlace}/>}
                {/*    {counseling && <PlaceOrder counseling={counseling} updatePlace={updatePlace}/>}*/}
                {/*    {counseling && <DeletePlace counseling={counseling}/>}*/}

                </div>
                <div className="col-md-6">
                {/*    {counseling && <PlaceContract counseling={counseling} updatePlace={updatePlace}/>}*/}
                {/*    {counseling && <PlaceQrMessages counseling={counseling}/>}*/}
                {/*    {counseling && <PlaceInviteCode counseling={counseling}/>}*/}
                </div>

            </div>}
        </>
    );
};

export default CounselingManagementSettingTab;
