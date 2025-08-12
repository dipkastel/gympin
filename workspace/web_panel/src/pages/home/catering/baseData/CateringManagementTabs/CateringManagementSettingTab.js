import React from 'react';
import _ChangeCateringStatus from "../status/_ChangeCateringStatus";

const CateringManagementSettingTab = ({catering, update}) => {
    return (
        <>
            {catering && <div className="row">

                <div className="col-md-6">
                    {catering && <_ChangeCateringStatus catering={catering} update={update}/>}
                    {/*{place && <PlaceOrder place={place} updatePlace={updatePlace}/>}*/}
                    {/*{place && <DeletePlace place={place}/>}*/}

                </div>
                <div className="col-md-6">
                    {/*{place && <PlaceContract place={place} updatePlace={updatePlace}/>}*/}
                    {/*{place && <PlaceQrMessages place={place}/>}*/}
                    {/*{place && <PlaceInviteCode place={place}/>}*/}
                </div>

            </div>}
        </>
    );
};

export default CateringManagementSettingTab;
