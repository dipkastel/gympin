import React from 'react';
import CorporateInvoices from "../Inovice/CorporateInvoices";

const CorporateManagementInvoiceTab = ({currentCorporate}) => {

    return (
        <>
            {currentCorporate && <div className="row">
                <div className="col-md-12">
                    <CorporateInvoices corporate={currentCorporate}/>
                </div>
            </div>}
        </>
    );
};

export default CorporateManagementInvoiceTab;
