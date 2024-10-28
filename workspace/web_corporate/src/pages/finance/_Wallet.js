import React, {useState} from 'react';
import {
    Backdrop,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Stack,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import {toPriceWithComma} from "../../helper/utils";
import __AddChargePartial from "./__AddChargePartial";

const _Wallet = () => {
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [loading, setLoading] = useState(false);


    function closeModal() {
        if (!loading) {
            setOpenModalAdd(false);
        }
    }


    function ModalDemandPayment() {
        return (
            <div>
                <Dialog  open={openModalAdd} onClose={() => closeModal()}>
                    <DialogTitle>افزایش شارژ</DialogTitle>
                    <DialogContent>
                        <Backdrop
                            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                            open={loading}
                        >
                            <CircularProgress color="inherit"/>
                        </Backdrop>
                        <__AddChargePartial corporate={corporate} setLoading={setLoading} setOpenModalAdd={setOpenModalAdd}/>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }

    return (
        <div  className={"col-md-6"}>
            <Card elevation={3} sx={{margin: 1,borderRadius:3}}>
                <CardContent
                >

                    <Stack
                        justifyContent="space-between"
                        alignItems="flex-start"
                        direction="row"
                        spacing={0}
                    >
                        <Typography variant="h6">
                            {" شارژ : " + toPriceWithComma(corporate?.FinanceCorporate?.TotalDeposit || 0) + " تومان"}
                        </Typography>
                        <Button variant={"contained"} onClick={() => setOpenModalAdd(true)}>افزایش </Button>
                    </Stack>
                    <Typography variant="caption"
                                component={"a"}
                                href={"/finance/IncreaseHistory"}
                                sx={{textDecoration: "none", color: "#000000"}}>
                        مشاهده تاریخچه افزایش شارژ
                    </Typography>
                </CardContent>
            </Card>
            {ModalDemandPayment()}
        </div>
    );
};

export default _Wallet;
