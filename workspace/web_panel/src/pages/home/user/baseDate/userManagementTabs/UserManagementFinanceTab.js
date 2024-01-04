import React, {useEffect, useState} from 'react';
import UserIncreaseDeposit from "../UserIncreaseDeposit/UserIncreaseDeposit";
import UserCredit from "../credit/UserCredit";
import UserTransactions from "../UserTransactions/UserTransactions";
import SettlementRequest from "../settlement/SettlementRequest";
import UserCorporatePersonelTransactions from "../UserTransactions/UserCorporatePersonelTransactions";
import {Portlet, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {TransactionCorporateTypes} from "../../../../../helper/enums/TransactionCorporateTypes";
import _PersonalTransactions from "../UserTransactions/_PersonalTransactions";
import _PersonnelTransactions from "../UserTransactions/_PersonnelTransactions";

const UserManagementFinanceTab = ({currentUser}) => {
    const [updatePageP,SetUpdatePageP] = useState(false);
    const [transactionType, SetTransactionType] = useState("DEPOSIT");
    useEffect(() => {
        if(updatePageP)
            SetUpdatePageP(false)
    }, [updatePageP]);
    function updatePage(){
        SetUpdatePageP(true)
    }
    return (
        <>
            {!updatePageP&&currentUser && <div className="row">
                <div className="col-md-6">
                    {currentUser &&
                    <Portlet>
                        <PortletHeader
                            title="تراکنش های شخصی کاربر"
                            toolbar={
                                <PortletHeaderToolbar>

                                    <FormControl fullWidth>
                                        <InputLabel id="status-select-label">نوع تراکنش</InputLabel>
                                        <Select
                                            label="نوع تراکنش"
                                            size={"small"}
                                            value={transactionType}
                                            onChange={e => SetTransactionType(e.target.value)}
                                        >
                                            {Object.keys(TransactionCorporateTypes).map((item, number) => (
                                                <MenuItem key={number} value={item}>{TransactionCorporateTypes[item]}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </PortletHeaderToolbar>}
                                />
                        {transactionType=="DEPOSIT"&&<_PersonalTransactions currentUser={currentUser} updatePage={updatePage} />}
                        {transactionType=="CREDIT"&&<_PersonnelTransactions currentUser={currentUser} updatePage={updatePage} />}
                                </Portlet>}
                            {currentUser && <UserIncreaseDeposit currentUser={currentUser} updatePage={updatePage}/>}
                            {currentUser && <UserCorporatePersonelTransactions currentUser={currentUser} updatePage={updatePage}/>}
                </div>
                <div className="col-md-6">
                      {currentUser && <UserCredit currentUser={currentUser} />}
                      {currentUser && <SettlementRequest currentUser={currentUser}  updatePage={updatePage}/>}
                </div>
            </div>}
        </>
    );
};

export default UserManagementFinanceTab;
