import React from 'react';
import CounselingAbout from "../About/CounselingAbout";
import CounselingPersonnel from "../Personnel/CounselingPersonnel";
import CounselingProficiencies from "../CounselingProficiencies/CounselingProficiencies";
import CounselingImages from "../Images/CounselingImages";

const CounselingManagementDataTab = ({counseling, updateCounseling}) => {
    return (
        <>
            {counseling && <div className="row">
                <div className="col-md-6">
                    {/*{counseling && <PlaceSports counseling={counseling}/>}*/}
                    {/*{counseling && <OptionOfPlace counseling={counseling}/>}*/}
                    {counseling && <CounselingAbout counseling={counseling}/>}
                    {counseling && <CounselingProficiencies counseling={counseling}/>}
                </div>
                <div className="col-md-6">
                    {counseling && <CounselingPersonnel counseling={counseling}/>}
                    {counseling && <CounselingImages counseling={counseling}/>}
                    {/*{counseling && <CounselingTags counseling={counseling}/>}*/}
                </div>

            </div>}
        </>
    );
};

export default CounselingManagementDataTab;
