import React, {useContext, useEffect} from 'react';
import {Grid, Typography, useColorScheme} from "@mui/material";
import AsyncSelect from "react-select/async";
import {useSelector} from "react-redux";
import {user_query} from "../network/api/user.api";
import {ErrorContext} from "./GympinPagesProvider";
import {corporatePersonnel_query} from "../network/api/corporatePersonnel.api";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import WPageCorporateDetails from "../pages/wizard/pages/WPageCorporateDetails";
import WPageProfile from "../pages/wizard/pages/WPageProfile";
import WPageContractData from "../pages/wizard/pages/WPageContractData";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import WPageContractSign from "../pages/wizard/pages/WPageContractSign";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import WPageUsersList from "../pages/wizard/pages/WPageUsersList";
import VerifiedIcon from "@mui/icons-material/Verified";
import WPageFinish from "../pages/wizard/pages/WPageFinish";

const __SelectPersonnel = ({hidden, onChange, value}) => {

    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate);

    const {mode} = useColorScheme();

    useEffect(() => {
        if (hidden)
            onChange({value: null});
    }, [hidden]);

    if (!mode) {
        return null;
    }


    const promiseUserOptions = (inputValue) => {
        return new Promise((resolve) => {
            function getLabelOfUser(itm) {
                return (<Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant={"body2"}>{((itm?.User?.FullName) ? `(${itm?.User?.FullName})` : "ثبت نشده")}</Typography>
                    <Typography variant={"body2"}>{itm?.User?.Username}</Typography>
                </Grid>)
            }

            corporatePersonnel_query({
                queryType: "FILTER",
                CorporateId:corporate.Id,
                FullName: inputValue,
                paging: {Page: 0, Size: 50, Desc: true}
            }).then((data) => {
                resolve(data.data.Data.content.map(itm => {
                    return {label: getLabelOfUser(itm), value: itm.Id}
                }));
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        });
    }


    return (
        <>
            {!hidden && <AsyncSelect cacheOptions defaultOptions
                                     className={mode=="dark"?"rselect-container":"rdselect-container"}
                                     classNamePrefix="rselect"
                                     name={"Personnel"}
                                     label="پرسنل"
                                     placeholder="پرسنل"
                                     onChange={onChange}
                                     loadOptions={promiseUserOptions}/>}
        </>
    );
};

export default __SelectPersonnel;
