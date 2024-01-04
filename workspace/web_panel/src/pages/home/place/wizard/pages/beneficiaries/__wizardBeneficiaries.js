import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Avatar, Button, Grid, TableCell} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {PlacePersonnelRole} from "../../../../../../helper/enums/PlacePersonnelRole";
import {useParams} from "react-router-dom";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {
    placePersonnel_ByPlace,
    placePersonnel_updatePersonnelCommissionFee
} from "../../../../../../network/api/placePersonnel.api";
import {Form} from "react-bootstrap";

const __wizardBeneficiaries = ({allowNext}) => {


    const error = useContext(ErrorContext);
    let {placeId} = useParams();
    const [placePersonnels, SetPlacePersonnels] = useState([])


    useEffect(() => {
        getPersonnelsOfPlace();
    }, []);

    function getPersonnelsOfPlace() {
        placePersonnel_ByPlace({Id: placeId}).then(data => {
            SetPlacePersonnels(data.data.Data);
            allowNext(data.data.Data.length > 0)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function setBeneficiaries(personel,e) {
        e.preventDefault();
        placePersonnel_updatePersonnelCommissionFee({
            Id: personel.Id,
            CommissionFee: e.target.CommissionFee.value
        }).then(result => {
            getPersonnelsOfPlace();
            error.showError({message: "عملیات موفق",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function setCommitionFee(row, e) {
        var newPersonels = placePersonnels.map(p=>{
            if(p.Id==row.Id)
                p.CommissionFee = e.target.value;
            return p;
        })
        SetPlacePersonnels(newPersonels)
    }

    return (
        <>
            <Portlet>
                <PortletHeader
                    title="ذینفعان"
                />
                <PortletBody>

                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">نام</TableCell>
                                <TableCell align="right">نقش</TableCell>
                                <TableCell align="left">درصد کمیسیون</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {placePersonnels && placePersonnels.map(row => (
                                <TableRow>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right"><Avatar
                                        alt={row.User.Username}
                                        src={row.User.Avatar ? row.User.Avatar.Url : ""}
                                        sx={{width: 20, height: 20}}/></TableCell>
                                    <TableCell
                                        align="right">{row.User.FullName || ""}-{row.User.Username}</TableCell>
                                    <TableCell align="right">{PlacePersonnelRole[row.UserRole]}</TableCell>
                                    <TableCell align="left">
                                        <form key={row.Id} onSubmit={(e) => setBeneficiaries(row, e)}>
                                            <Grid container alignContent={"center"} justifyContent={"end"} direction={"row"}>
                                                <Grid>
                                                    <Form.Control
                                                        name="CommissionFee"
                                                        type={"number"}
                                                        value={row.CommissionFee}
                                                        onChange={(e)=>setCommitionFee(row,e)}
                                                        placeholder="درصد"
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <Button variant={"contained"} size={"large"} color={"primary"}
                                                            type={"submit"}>ثبت</Button>
                                                </Grid>

                                            </Grid>
                                        </form>
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

export default __wizardBeneficiaries;
