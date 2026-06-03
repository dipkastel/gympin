import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import {getUserFixedName, toPriceWithComma} from "../../../helper/utils";
import {CreditStatusEnum} from "../../../helper/enums/CreditStatusEnum";
import {AssignmentReturned, ExpandLess, ExpandMore} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {Form} from "react-bootstrap";
import {TransactionPersonnelCredit_query} from "../../../network/api/transactionPersonnelCredit.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {ProcessTypeEnum} from "../../../helper/enums/ProcessTypeEnum";
import {corporatePersonnel_manualExpireCredit} from "../../../network/api/corporatePersonnel.api";

const _UserCreditListItem = ({userCredit, updatePage}) => {


    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [creditToDecrease, setCreditToDecrease] = useState(null);
    const [opendetails, setOpenDetails] = useState(null);
    const corporate = useSelector(({corporate}) => corporate.corporate);
    const [creditTransactions, setCreditTransaction] = useState([]);


    useEffect(() => {
        if (!opendetails) return;
        getTransactionDetails();
    }, [opendetails]);


    function getTransactionDetails() {
        TransactionPersonnelCredit_query({
            queryType: "FILTER",
            CreditId: userCredit.Id,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            setCreditTransaction(data.data.Data.content)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function renderModalDecrease() {

        function creditExpire(e) {
            e.preventDefault();
            setCreditToDecrease(null);
            corporatePersonnel_manualExpireCredit({
                Id: userCredit.Id,
            }).then(result => {
                error.showError({message: "با موفقیت انجام شد",});
                updatePage();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <Dialog open={!!creditToDecrease} onClose={() => setCreditToDecrease(null)}>
                <Form onSubmit={(e) => creditExpire(e)}>
                    <DialogTitle>
                        منقضی سازی اعتبار
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText component={"div"}>
                            {"اعتبار " + toPriceWithComma(creditToDecrease?.CreditAmount) + " تومان از " + getUserFixedName(creditToDecrease?.CorporatePersonnel?.User) + "منقضی خواهد شد."}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"success"} type={"submit"}>تایید</Button>
                    </DialogActions>
                </Form>
            </Dialog>
        )
    }

    function getTitle(uc){
        var title ="";
        title+= toPriceWithComma(uc.CreditAmount);
        title+=" تومان ";
        title+=uc.Name?"( "+uc.Name+" )":"";
        return title;
    }

    return (
        <div>
            <ListItem onClick={e => setOpenDetails(!opendetails)} sx={{textAlign: "right", p: 0}}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{p: 0, m: 0}}
                >
                    <Grid item>

                        <ListItemText
                            primary={getTitle(userCredit)}
                            primaryTypographyProps={{textAlign:"start"}}
                            secondary={userCredit?.Status == "ACTIVE" ? "انقضا : " + new Date(userCredit?.ExpireDate).toLocaleDateString('fa-IR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }) : CreditStatusEnum[userCredit?.Status]}
                            secondaryTypographyProps={{textAlign:"start"}}
                        />

                    </Grid>
                    <Grid item>

                        <ListItemText
                            primary={"ایجاد : " + new Date(userCredit?.CreatedDate).toLocaleDateString('fa-IR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                            primaryTypographyProps={{variant: "body2", color: "#969696",textAlign:"end"}}
                            secondary={opendetails ? <ExpandLess/> : <ExpandMore/>}
                            secondaryTypographyProps={{textAlign:"end"}}
                            sx={{textAlign: "left"}}/>

                    </Grid>
                </Grid>
            </ListItem>
            <Collapse in={opendetails} timeout="auto" unmountOnExit>
                {creditTransactions.map(tr => (
                    <div key={"tr" + tr.Id}>
                        <Typography variant={"caption"} color={"#afafaf"}>
                            {new Date(tr?.Serial?.CreatedDate).toLocaleDateString('fa-IR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }) + " " + ProcessTypeEnum[tr?.Serial?.ProcessType] + " تغییر از " + toPriceWithComma(tr?.LatestBalance) + " به " + toPriceWithComma(tr?.LatestBalance + tr?.Amount)}
                        </Typography>
                    </div>
                ))}
                {userCredit?.Status === "ACTIVE" && userCredit?.CreditAmount > 0 &&
                <IconButton color={"error"} onClick={(e) => setCreditToDecrease(userCredit)}>
                    <AssignmentReturned/>
                </IconButton>}
            </Collapse>
            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0, width: "100%"}}
                     component="div"/>
            {renderModalDecrease()}
        </div>
    );
};

export default _UserCreditListItem;
