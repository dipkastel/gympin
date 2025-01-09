import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Collapse,
    Dialog, DialogContent, DialogTitle,
    Divider,
    Grid,
    List,
    ListItemText,
    Typography
} from "@mui/material";
import {toPriceWithComma} from "../../../helper/utils";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {User_getMyCredits} from "../../../network/api/user.api";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {creditTypes} from "../../../helper/enums/creditTypes";
import _WalletType from "./_WalletType";
import {CorporateContractType} from "../../../helper/enums/CorporateContractType";
import {Info, InfoOutlined} from "@mui/icons-material";

const _WalletAmount = () => {
    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user);
    const [userCredit, setUserCredit] = useState([])
    const [selectedCredit,setSelectedCredit] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    useEffect(() => {
        document.title = 'کیف پول';
        getUserCredit();
    }, [currentUser]);


    function getUserCredit() {
        User_getMyCredits().then(result => {
            setUserCredit(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function getCredits(){
        return userCredit?.CreditDetails?.filter(c=>c.CreditPayableAmount>0);
    }

    function renderModalDescribeType(){
        if(!(selectedCredit?.Corporate?.ContractType))
            return ;

        return (<>
            <Dialog
                sx={{zIndex: 9999999999}}
                className={"w-100"}
                open={!!selectedCredit}
                onClose={()=>setSelectedCredit(null)}
            >
                <DialogTitle>

                    <Grid
                        container
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems="center"
                        sx={{padding: 1}}
                    >

                        <Typography variant={"h6"}>
                            {selectedCredit&&("اعتبار نوع "+CorporateContractType[selectedCredit?.Corporate?.ContractType])}
                        </Typography>
                        <InfoOutlined sx={{color:"#121c3b",fontSize:"35px"}}/>
                    </Grid>
                </DialogTitle>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0, width: "100%"}} component="div"/>
                <DialogContent>
                    {selectedCredit?.Corporate?.ContractType=="ALPHA"&&<>
                    <Typography variant={"subtitle1"}>
                        مبلغ اعتبار تا تاریخ ذکر شده قابل استفاده می باشد.
                    </Typography>

                        <Divider variant="inset" sx={{mx:0,my:1, width: "100%"}} component="div"/>
                    <Typography variant={"body2"}>
                        *این اعتبار در هرزمان، بنابر صلاحدید شرکت مربوطه، قابل کسر یا مسدود شدن می باشد.
                    </Typography>
                    </>}
                    {selectedCredit?.Corporate?.ContractType=="PRO"&&<>
                        <Typography variant={"subtitle1"}>
                            برای اعتبار اعطایی از سمت ‌شرکت مربوطه، تاریخ انقضا تعریف شده است و پس از سررسید تاریخ، اعتبار غیرقابل استفاده خواهد شد.
                        </Typography>

                        <Divider variant="inset" sx={{mx:0,my:1, width: "100%"}} component="div"/>
                        <Typography variant={"body2"}>
                            *این اعتبار در هرزمان، بنابر صلاحدید شرکت مربوطه، قابل کسر یا مسدود شدن می باشد.
                        </Typography></>}
                    {selectedCredit?.Corporate?.ContractType=="NEO"&&<>
                        <Typography variant={"subtitle1"}>
                            مبلغ پرداخت شده از طرف شرکت مربوطه برای مجموع اعتبارهای کارمندان، به صورت اشتراکی بوده و با به پایان رسید مبلغ، تمامی اعتبارها غیرقابل استفاده خواهد شد.
                        </Typography>

                        <Divider variant="inset" sx={{mx:0,my:1, width: "100%"}} component="div"/>
                        <Typography variant={"body2"}>
                            *این اعتبار در هرزمان، بنابر صلاحدید شرکت مربوطه، قابل کسر یا مسدود شدن می باشد.
                        </Typography></>}
                </DialogContent>
            </Dialog>
        </>)

    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    sx={{backgroundColor: "#469391"}}
                    onClick={(e) => setIsExpanded(!isExpanded)}
                    title={<Typography
                        sx={{display: "inline", m: 1}}
                        variant={"subtitle"}
                        color={"white"}
                    >
                        {"اعتبار : " + toPriceWithComma(userCredit.TotalCredit) + " تومان"}
                    </Typography>}
                    action={
                        <>
                            {isExpanded ? <ExpandLessIcon sx={{color: "#FFF"}}/> :
                                <ExpandMoreIcon sx={{color: "#FFF"}}/>}
                        </>
                    }
                />

                <Collapse in={!!isExpanded} timeout={"auto"} unmountOnExit>
                    <CardContent >
                        <List>
                            {userCredit.CreditDetails && getCredits().map((item, number) => (
                                <div  key={number} onClick={(e)=>{setSelectedCredit(item)}} ><_WalletType credit={item}/></div>
                            ))}
                        </List>
                        <Button href={"/UserRequests"} variant={"outlined" } fullWidth color={"info"} >تاریخچه درخواست‌ها</Button>

                    </CardContent>
                </Collapse>

            </Card>
            {renderModalDescribeType()}

        </>

    );
};

export default _WalletAmount;
