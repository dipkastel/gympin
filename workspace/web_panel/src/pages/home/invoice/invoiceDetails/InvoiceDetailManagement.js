import React, {useContext, useEffect, useState} from 'react';
import Notice from "../../../partials/content/Notice";
import {useParams} from "react-router-dom";
import {invoice_getById} from "../../../../network/api/invoice.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import InvoiceDetailBaseData from "./baseData/invoiceDetailBaseData";
import Notes from "../../../partials/content/notes/Notes";
import InvoiceDetailUserData from "./baseData/invoiceDetailUserData";
import InvoiceDetailStatusData from "./baseData/invoiceDetailStatusData";
import InvoiceDetailPricesData from "./baseData/invoiceDetailPricesData";
import InvoiceDetailBuyables from "./buyables/InvoiceDetailBuyables";
import InvoiceActions from "./actions/InvoiceActions";
import InvoiceBuysData from "./InvoiceBuysData/InvoiceBuysData";

const InvoiceDetailManagement = () => {

    const error = useContext(ErrorContext);
    const {invoiceId} = useParams();
    const [invoice, setInvoice] = useState();


    const [updatePageP, SetUpdatePageP] = useState(false);
    useEffect(() => {
        if (updatePageP)
            SetUpdatePageP(false)
        else
            getInvoice();
    }, [updatePageP]);

    function updatePage() {
        SetUpdatePageP(true)
    }

    function getInvoice() {
        invoice_getById({id: invoiceId}).then(result => {
            setInvoice(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <div>
            <Notice icon="flaticon-warning kt-font-primary">
                {'مدیریت فاکتور شماره ' + invoiceId}
                <br />
                {'سریال : '+invoice?.Serial?.Serial}
            </Notice>
            {!updatePageP && invoice && <div className={"row"}>
                <div className={"col-md-10"}>
                    <div className={"row"}>
                        <div className={"col-md-3"}>
                            <InvoiceDetailBaseData invoice={invoice}/>
                        </div>
                        <div className={"col-md-2"}>
                            <InvoiceDetailUserData invoice={invoice}/>
                        </div>
                        <div className={"col-md-5"}>
                            <InvoiceDetailStatusData invoice={invoice} updatePage={updatePage}/>
                            <InvoiceDetailPricesData invoice={invoice} updatePage={updatePage}/>
                        </div>
                        <div className={"col-md-2"}>
                            <InvoiceActions invoice={invoice} updatePage={updatePage}/>
                        </div>
                        <div className={"col-md-12"}>
                            <InvoiceDetailBuyables invoice={invoice} updatePage={updatePage}/>
                        </div>
                        <InvoiceBuysData invoice={invoice}/>

                    </div>
                </div>
                <div className="col-md-2">
                    <Notes source={{Invoice: {Id: invoice.Id}}}/>
                </div>


            </div>}
        </div>
    );
};

export default InvoiceDetailManagement;
