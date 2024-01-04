import React from 'react';
import _ChangePlaceStatus from "../status/_ChangePlaceStatus";
import PlaceInviteCode from "../Invite/PlaceInviteCode";
import DeletePlace from "../Delete/DeletePlace";
import PlaceQrMessages from "../QrMessages/PlaceQrMessages";

const PlaceManagementSettingTab = ({place,updatePlace}) => {
    return (
        <>
            {place && <div className="row">

                <div className="col-md-6">
                    {place && <_ChangePlaceStatus place={place} updatePlace={updatePlace}/>}
                    {place && <DeletePlace place={place}/>}

                </div>
                <div className="col-md-6">
                    {place && <PlaceQrMessages place={place}/>}
                    {place && <PlaceInviteCode place={place}/>}
                </div>

            </div>}
        </>
    );
};

export default PlaceManagementSettingTab;
