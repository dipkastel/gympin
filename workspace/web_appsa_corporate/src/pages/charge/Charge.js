import React, {useState} from 'react';
import {Button, Container, Grid2 as Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import _ChargeCreateInvoice from "./_ChargeCreateInvoice";
import _ChargeInvoices from "./_ChargeInvoices";

const Charge = () => {
    const navigate = useNavigate();
    const [refreshCode,setRefreshCode] = useState(0);

    return (<>
        <title>مالی</title>
        <Container>
            <Grid container columns={9} alignItems={"center"}>
                <Grid size={{md: 6, lg: 6, xl: 6}}><Typography sx={{m: 4}} variant={"h4"}>مالی</Typography></Grid>
                <Grid textAlign={"end"} size={{md: 3, lg: 3, xl: 3}}>
                    <Button onClick={() => navigate("/finance/IncreaseHistory")} variant={"contained"}>تاریخچه تراکنش‌ها</Button>
                </Grid>
            </Grid>
            <Grid container direction={"row"} columns={12} alignItems={"start"} >
                <_ChargeCreateInvoice refreshList={()=>setRefreshCode(Math.random())} />
                <_ChargeInvoices refreshCode={refreshCode} />
            </Grid>
        </Container>
    </>);

    //
    // return !openConfirmPage ? (
    //     <Container>
    //     </Container>
    // ) : (
    //     <Container>
    //
    //         <title>افزایش شارژ</title>
    //
    //         <Grid container columns={9} alignItems={"center"}>
    //             <Grid size={{md: 6, lg: 6, xl: 6}}><Typography sx={{m: 4}} variant={"h4"}>افزایش شارژ</Typography></Grid>
    //             <Grid textAlign={"end"} size={{md: 3, lg: 3, xl: 3}}></Grid>
    //         </Grid>
    //
    //
    //         <Grid
    //             container
    //             direction="column"
    //             justifyContent="center"
    //             alignItems="center"
    //             sx={{padding: 1}}
    //         >
    //             <Card elevation={10} sx={{m: 3, borderRadius: 5, width: "50%"}}>
    //                 <TableContainer fullWidth>
    //                     <Table aria-label="invoice">
    //                         <TableHead>
    //                             <TableRow sx={{bgcolor: "primary.boxBg"}}>
    //                                 <TableCell align="start">مورد</TableCell>
    //                                 <TableCell align="right">قیمت</TableCell>
    //                             </TableRow>
    //                         </TableHead>
    //                         <TableBody>
    //                             <TableRow key={1} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
    //                                 <TableCell align="start">افزایش شارژ</TableCell>
    //                                 <TableCell align="right">{toPriceWithComma(amountToPay)}</TableCell>
    //                             </TableRow>
    //                             <TableRow key={1} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
    //                                 <TableCell align="start">{taxPrice + "%"} مالیات بر ارزش افزوده</TableCell>
    //                                 <TableCell align="right">{toPriceWithComma(getTaxAmount())}</TableCell>
    //                             </TableRow>
    //                             <TableRow key={1} sx={{'&:last-child td, &:last-child th': {border: 0}, bgcolor: "primary.boxBg"}}>
    //                                 <TableCell align="start">قابل پرداخت</TableCell>
    //                                 <TableCell align="right">{toPriceWithComma(getAmountToPay())}</TableCell>
    //                             </TableRow>
    //                         </TableBody>
    //                     </Table>
    //                 </TableContainer>
    //             </Card>
    //             {selectedGateway?.Gateway?.Description && <Card elevation={10} sx={{p: 3, borderRadius: 5, width: "50%"}}>
    //
    //                 <Typography sx={{width: "100%", textAlign: "justify", pt: 3, pr: 3}} variant={"h6"}>
    //                     {selectedGateway?.Gateway?.Description}
    //                 </Typography>
    //             </Card>}
    //             <Card elevation={10} sx={{p: 3, m: 3, borderRadius: 5, width: "50%"}}>
    //
    //
    //                 <FormControlLabel onChange={(e) => setInvoiceRequired(e.target.checked)} control={<Checkbox size={"large"}/>}
    //                                   label="فاکتور رسمی"/>
    //
    //                 <Grid
    //                     container
    //                     direction="row"
    //                     justifyContent={"space-between"}
    //                     alignItems="center"
    //                     sx={{padding: 1}}
    //                 >
    //
    //                     <TextField
    //                         hidden={selectedGateway?.Gateway?.GatewayType == 'BANK_PORTAL'}
    //                         variant="outlined"
    //                         margin="normal"
    //                         sx={{flex: "auto"}}
    //                         type="text"
    //                         name="code"
    //                         value={transactionReference || ""}
    //                         onChange={e => SetTransactionRefrence(e.target.value)}
    //                         label={getlabelOfRefrence()}
    //                     />
    //
    //                     <ToggleButton
    //                         sx={{margin: "9px 9px 0px 0px"}}
    //                         value="comment"
    //                         onClick={(e) => setCommentToggle(!commentToggle)}
    //                     >
    //                         <InsertComment/>
    //                     </ToggleButton>
    //                 </Grid>
    //                 <TextField
    //                     hidden={!commentToggle}
    //                     className="w-100"
    //                     variant="outlined"
    //                     margin="normal"
    //                     name="description"
    //                     value={transactionDescription || ""}
    //                     multiline={true}
    //                     minRows={3}
    //                     type="text"
    //                     onChange={e => SetTransactionDescription(e.target.value)}
    //                     label={"در صورت نیاز توضیح درج شود."}
    //                 />
    //                 {/*<LocalizationProvider*/}
    //                 {/*    dateAdapter={AdapterJalaali}>*/}
    //                 {/*    <DatePicker*/}
    //                 {/*        variant="outlined"*/}
    //                 {/*        mask="____/__/__"*/}
    //                 {/*        value={chequeDate || ""}*/}
    //                 {/*        onChange={(e, w) => {*/}
    //                 {/*            setChequeDate(Date.parse(e))*/}
    //                 {/*        }}*/}
    //                 {/*        renderInput={(params) =>*/}
    //                 {/*            <TextField*/}
    //                 {/*                hidden={selectedGateway?.Gateway?.GatewayType !== 'CHEQUE'}*/}
    //                 {/*                {...params}*/}
    //                 {/*                fullWidth*/}
    //                 {/*                sx={{mt: 3, direction: "ltr"}}*/}
    //                 {/*                className="w-100"*/}
    //                 {/*                variant="outlined"*/}
    //                 {/*                margin="normal"*/}
    //                 {/*                label={"تاریخ چک"}*/}
    //                 {/*            />*/}
    //                 {/*        }*/}
    //                 {/*    />*/}
    //                 {/*</LocalizationProvider>*/}
    //
    //                 <Button edge="end" aria-label="Toggle password visibility" variant={"contained"} fullWidth
    //                         onClick={(e) => submitPayment(e)}> پرداخت </Button>
    //             </Card>
    //         </Grid>
    //     </Container>);
};

export default Charge;
