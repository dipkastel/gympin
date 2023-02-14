import React, {useEffect,useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack, TextField,
    Typography
} from "@mui/material";
import {corporate_getTotalDeposit} from "../../network/api/corporate.api";
import {useSelector} from "react-redux";
import {toPriceWithComma} from "../../helper/utils";

const _Wallet = () => {
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [totalDeposit, setTotalDeposit] = useState(0);

    useEffect(() => {
        corporate_getTotalDeposit({CorporateId:corporate.Id}).then(result=>{
            setTotalDeposit(result.data.Data)
        }).catch(e=>console.log(e))
    }, []);



    function ModalDemandPayment(){
        return (
            <div>
                <Dialog open={openModalAdd} onClose={()=>setOpenModalAdd(false)}>
                    <DialogTitle>افزایش اعتبار</DialogTitle>
                    <DialogContent >
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="مبلغ افزایش"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>setOpenModalAdd(false)}>لغو</Button>
                        <Button onClick={()=>setOpenModalAdd(false)}>ثبت</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardContent
                    >
                    مانده شارژ شما :
                    <Stack
                        justifyContent="space-between"
                        alignItems="flex-start"
                        direction="row"
                        spacing={0}
                    >
                        <Typography variant="h6" >
                            {toPriceWithComma(totalDeposit)+" تومان"}
                        </Typography>
                        <Button variant={"contained"} onClick={()=>setOpenModalAdd(true)}>افزایش اعتبار</Button>
                    </Stack>
                    <Typography  variant="caption"
                                 component={"a"}
                                 href={"/finance/IncreaseList"}
                                 sx={{textDecoration:"none",color:"#000000"}}>
                        مشاهده تاریخچه افزایش اعتبار
                    </Typography>
                </CardContent>
            </Card>
            {ModalDemandPayment()}
        </>
    );
};

export default _Wallet;
