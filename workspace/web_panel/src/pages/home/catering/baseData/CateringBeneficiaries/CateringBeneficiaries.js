import React, {useContext, useEffect, useState} from 'react';
import {Button, TableCell} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {placeGym_getBuyableByPlace} from "../../../../../network/api/place.api";
import {placePersonnel_ByPlace} from "../../../../../network/api/placePersonnel.api";
import Select from "react-select";
import { buyable_setTicketBeneficiary} from "../../../../../network/api/buyable.api";
import {getUserFixedName} from "../../../../../helper";
import {Catering_getBuyableByPlace} from "../../../../../network/api/catering.api";

const CateringBeneficiaries = ({catering,update}) => {
    const error = useContext(ErrorContext);
    const [cateringTickets,SetCateringTickets] = useState([])
    const [beneficiaries,setBeneficiaries] = useState(null)
    useEffect(() => {
        getAllBuyables();
    }, []);
    function getAllBuyables(){
        Catering_getBuyableByPlace({Id:catering.Id}).then(data=>{
            SetCateringTickets(data.data.Data);
            getBeneficiaries();
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }
    function getBeneficiaries(){
        placePersonnel_ByPlace({Id:catering.Id}).then(result=>{
            setBeneficiaries(result.data.Data.filter(p=>p.IsBeneficiary));
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function updateTicketBeneFiciaries(ticket, person) {
        buyable_setTicketBeneficiary({
            Id:ticket.Id,
            Beneficiary:{Id:person.value}
        }).then(result=>{
            getAllBuyables();
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
                <PortletHeader
                    title="انتخاب ذینفع برای بلیط ها"
                />

                <PortletBody>

                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">name</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {beneficiaries&&cateringTickets&&cateringTickets.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row" >{row.Id}</TableCell>
                                    <TableCell align="right">{row.Name}</TableCell>
                                    <TableCell align="left">
                                        <Select
                                            className={"dropdown"}
                                            options={beneficiaries.map(g=>{return {label:getUserFixedName(g.User),value:g.Id}})}
                                            value={{label:getUserFixedName(row.Beneficiary?.User),value:row.Beneficiary?.Id}}
                                            onChange={e => updateTicketBeneFiciaries(row,e)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default CateringBeneficiaries;
