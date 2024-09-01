import React, {useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem, Tab, Tabs,
    Typography
} from "@mui/material";
import {toPriceWithComma} from "../../../helper/utils";
import {AssignmentReturned} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {Form} from "react-bootstrap";

const _UserCredits = ({corporatePersonnel,updatePage}) => {


    const [creditToDecrease,setCreditToDecrease] = useState(null);
    const [selectedTab,setSelectedTab] = useState(0);
    const corporate = useSelector(({corporate}) => corporate.corporate);

    function renderModalDecrease() {

        function creditDecrease(e){
            e.preventDefault();
        }

        function creditExpire(e) {
            e.preventDefault();
        }

        return(
            <Dialog open={!!creditToDecrease} onClose={() => setCreditToDecrease(null)}>
                <Form onSubmit={(e) => creditDecrease(e)}>
                </Form>
                <Form onSubmit={(e) => creditExpire(e)}>
                </Form>
                    <DialogTitle>
                        منقضی سازی اعتبار
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText component={"div"}>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"error"}
                                onClick={() => setCreditToDecrease(null)}>لغو</Button>
                        <Button variant={"contained"} color={"success"} type={"submit"}>تایید</Button>
                    </DialogActions>
            </Dialog>
        )
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"تاریخچه شارژهای کاربر"}
                />
                <CardContent>
                    <List>
                        {corporatePersonnel.CreditList && corporatePersonnel.CreditList.map(item => (
                            <div key={item.Id}>
                                <ListItem>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <Typography
                                                variant={"subtitle1"}>{"افزایش : " + toPriceWithComma(item.CreditAmount) + " تومان"}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant={"overline"}>{new Date(item.CreatedDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}</Typography>
                                            <IconButton color={"error"} onClick={(e)=>setCreditToDecrease(item)}>
                                                <AssignmentReturned />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0, width: "100%"}}
                                         component="div"/>
                            </div>
                        ))}
                    </List>
                </CardContent>
            </Card>
            {renderModalDecrease()}
        </>
    );
};

export default _UserCredits;
