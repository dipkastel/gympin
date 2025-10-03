import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers";
import {TextField, Typography} from "@mui/material";
import {corporate_updateContractDate} from "../../../../../network/api/corporate.api";
import {AdapterDateFnsJalali} from '@mui/x-date-pickers/AdapterDateFnsJalali';

const CorporateContractExpire = ({currentCorporate, UpdatePage}) => {
    const error = useContext(ErrorContext);
    const [contractDate,setContractDate] = useState(currentCorporate.ContractDate);

    useEffect(() => {
        setContractDate(currentCorporate.ContractDate)
    }, [currentCorporate]);



    function UpdateContractDate(e) {
        corporate_updateContractDate({Id:currentCorporate.Id,ContractDate:e}).then(result=>{
            UpdatePage()
            error.showError({message: "عملیات موفق",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <>
            <Portlet>
                <PortletHeader title="قرارداد"/>
                <PortletBody>


                    <LocalizationProvider
                        dateAdapter={AdapterDateFnsJalali}>
                        <DatePicker
                            className={"ltr mt-4 mb-2 w-100"}
                            label="تاریخ قرارداد"
                            value={contractDate}
                            onChange={e=>UpdateContractDate(e)}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                    </LocalizationProvider>
                    {currentCorporate.ContractExpireDate&&<Typography variant={"body"}>
                        {"تاریخ اتمام قرارداد : " + new Date(currentCorporate.ContractExpireDate).toLocaleDateString('fa-IR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Typography>}


                </PortletBody>
            </Portlet>
        </>
    );
};

export default CorporateContractExpire;
