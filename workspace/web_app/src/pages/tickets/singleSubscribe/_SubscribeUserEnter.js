import React, {useState} from 'react';
import _GeneratedQrCode from "../commonPartials/_QRcode";
import {Card, CardHeader, Grid, Tab, Tabs} from "@mui/material";
import _ScanQrCode from "../commonPartials/_ScanQrCode";
import _TicketInvoice from "../commonPartials/_TicketInvoice";

const _SubscribeUserEnter = ({ticket,userCanEnter}) => {

    const [selectedTab, setSelectedTab] = useState(userCanEnter?"SCAN":"INVOICE");

    return (
        <>
            <Card variant={"outlined"}>
                <Tabs
                    value={selectedTab}
                    onChange={(e, n) => setSelectedTab(n)}
                    variant="fullWidth"
                    textColor="inherit"
                    TabIndicatorProps={{ sx: { display: "none" } }}
                    sx={{
                        background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
                        borderRadius: 3,
                        borderBottomLeftRadius:0,
                        borderBottomRightRadius:0,
                        p: 0.5,
                    }}
                >
                    {userCanEnter&&<Tab
                        label={ticket?.EntryList?.length>0?"ثبت ورود":"تکمیل خرید"}
                        value={"SCAN"}
                        sx={{
                            color: "white",
                            fontWeight: selectedTab === "SCAN" ? "bold" : "normal",
                            fontSize: selectedTab === "SCAN" ? "1.1rem" : "0.95rem",
                            transition: "all 0.3s ease",
                            "&.Mui-selected": { color: "#fff" }
                        }}
                    />}
                    {ticket?.EntryList?.length>0 &&
                    <Tab
                        label={"سند پرداخت"}
                        value={"INVOICE"}
                        sx={{
                            color: "white",
                            fontWeight: selectedTab === "INVOICE" ? "bold" : "normal",
                            fontSize: selectedTab === "INVOICE" ? "1.1rem" : "0.95rem",
                            transition: "all 0.3s ease",
                            "&.Mui-selected": { color: "#fff" }
                        }}
                    /> }
                </Tabs>
                {/*{selectedTab=="QRCODE"&&<_GeneratedQrCode ticket={ticket} type={"SUBSCRIBE"} userCanEnter={userCanEnter}/>}*/}
                {selectedTab=="SCAN"&&<_ScanQrCode ticket={ticket} type={"SUBSCRIBE"} userCanEnter={userCanEnter}/>}
                {ticket?.EntryList?.length>0 &&selectedTab=="INVOICE"&&<_TicketInvoice ticket={ticket} type={"SUBSCRIBE"} userCanEnter={userCanEnter}/> }
            </Card>
        </>
    );
};

export default _SubscribeUserEnter;
