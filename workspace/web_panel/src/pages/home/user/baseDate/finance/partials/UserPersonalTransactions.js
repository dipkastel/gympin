import React, {useState} from 'react';
import {Portlet, PortletHeader, PortletHeaderToolbar} from "../../../../../partials/content/Portlet";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {TransactionCorporateTypes} from "../../../../../../helper/enums/TransactionCorporateTypes";
import _PersonalTransactions from "../../UserTransactions/_PersonalTransactions";
import _PersonnelTransactions from "../../UserTransactions/_PersonnelTransactions";

const UserPersonalTransactions = ({currentUser,updatePage}) => {

    const [transactionType, SetTransactionType] = useState("DEPOSIT");
    return (
        <div>
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
            </Portlet>
        </div>
    );
};

export default UserPersonalTransactions;
