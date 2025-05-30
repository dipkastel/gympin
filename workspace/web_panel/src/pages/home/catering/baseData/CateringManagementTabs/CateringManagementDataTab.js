import React from 'react';
import CateringAbout from "../About/CateringAbout";
import CateringFoods from "../foods/CateringFoods";

const PlaceManagementDataTab = ({catering, updatePlace}) => {
    return (
        <>
            {catering && <div className="row">
                <div className="col-md-6">
                    {/*{place && <PlaceSports place={place}/>}*/}
                    {/*{place && <OptionOfPlace place={place}/>}*/}
                    <CateringAbout catering={catering}/>
                </div>
                <div className="col-md-6">
                    <CateringFoods catering={catering}/>
                    {/*{place && <PlacePersonnel place={place}/>}*/}
                    {/*{place && <PlaceImages place={place}/>}*/}
                    {/*{place && <PlaceTags place={place}/>}*/}
                    {/*{place && <Halls place={place}/>}*/}
                </div>

            </div>}
        </>
    );
};

export default PlaceManagementDataTab;
