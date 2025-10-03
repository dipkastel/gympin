import React, {useContext, useEffect, useState} from 'react';
import {Box, Chip, Collapse, Grid, IconButton, Typography} from "@mui/material";
import {CheckBox, ExpandLess, ExpandMore, QuestionMark} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import {ErrorContext} from "../../../../../../../components/GympinPagesProvider";
import {placePersonnel_getPlaceBeneficiaries} from "../../../../../../../network/api/placePersonnel.api";
import {buyable_getById, buyable_setTicketBeneficiary} from "../../../../../../../network/api/buyable.api";

const __wizardTicketBuyableBeneficiary = ({ticketSubscribe, setCanGoNext}) => {

    const error = useContext(ErrorContext);
    let {placeId} = useParams();


    const [openCollapsableSports, setOpenCollapsableSports] = useState(false)
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [beneficiaries, setBeneficiaries] = useState([])


    useEffect(() => {
        getTicketBuyable();
    }, []);

    function getTicketBuyable() {
        buyable_getById({id: ticketSubscribe.Id}).then(result => {
            setSelectedTicket(result.data.Data);
            getPlaceBeneficiaries();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function getPlaceBeneficiaries() {
        placePersonnel_getPlaceBeneficiaries({placeId: placeId}).then(result => {
            setBeneficiaries(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function ToggleBeneficiary(e, beneficiary) {
        var beneficiarId =(!selectedTicket?.Beneficiary)?beneficiary.Id:((beneficiary.Id==selectedTicket.Beneficiary.Id)?0:beneficiary.Id);
        buyable_setTicketBeneficiary({
            Id:selectedTicket.Id,
            Beneficiary:{Id:beneficiarId}
        }).then(result => {
            getTicketBuyable();
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

            <Grid container alignItems={"center"} justifyContent={"space-between"} direction={"row"}
            >
                <Grid item onClick={() => setOpenCollapsableSports(!openCollapsableSports)}>
                    <Typography variant={"subtitle1"}>ذینفع</Typography>
                </Grid>
                <Grid item>
                    <IconButton
                        onClick={() => setOpenCollapsableSports(!openCollapsableSports)}>
                        {!selectedTicket?.Beneficiary ? <QuestionMark color={"warning"}/> : <CheckBox color="success"/>}
                    </IconButton>
                    <IconButton
                        onClick={() => setOpenCollapsableSports(!openCollapsableSports)}>
                        {!openCollapsableSports ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                </Grid>
            </Grid>

            <Collapse in={openCollapsableSports} timeout="auto" unmountOnExit>

                <Box>
                    {beneficiaries && beneficiaries.map((row =>
                            <Chip key={"benefi" + row.Id} label={row.User.FullName?row.User.FullName:row.User.PhoneNumber} sx={{margin: 1}}
                                  color={selectedTicket?.Beneficiary?.Id == row.Id ? "success" : "default"}
                                  onClick={(e) => ToggleBeneficiary(e, row)}
                            />
                    ))}
                </Box>

            </Collapse>
        </>
    );
};

export default __wizardTicketBuyableBeneficiary;
