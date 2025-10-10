import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {corporate_getTotalIncreases} from "../../network/api/corporate.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {ProgressBar} from "react-bootstrap";
import {toPriceWithComma} from "../../helper/utils";

const _CorporatePlan = () => {
    const corporate = useSelector(({corporate}) => corporate.corporate);
    const error = useContext(ErrorContext);
    const [totalIncreases, setTotalIncreases] = useState(null);

    useEffect(() => {
        corporate_getTotalIncreases({FinanceCorporateId: corporate.FinanceCorporate.Id}).then(data => {
            setTotalIncreases(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);

    switch (true) {
        case totalIncreases < 200000000 : {
             if(corporate?.ContractType!=="ALPHA") return ;
            return Alpha(200000000-totalIncreases);
        }
        case totalIncreases < 500000000 : {
            if(corporate?.ContractType!=="PRO") return ;
            return pro(500000000-totalIncreases);
        }
        case totalIncreases >= 500000000 : {
            if(corporate?.ContractType!=="NEO") return ;
            return neo(totalIncreases-500000000);
        }
    }

    function Alpha(remined) {
        return (
            <div className={"col-md-6"}>
                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardContent>
                        <Typography variant={"subtitle1"}>
                            {"با پرداخت مجموع "+toPriceWithComma(remined)+" تومان پلن خود را به پرو تغییر دهید."}
                        </Typography>
                        <ProgressBar className={"mt-2 mb-3"} min={0} now={totalIncreases} max={200000000} />

                        <Typography variant={"subtitle1"}> {"امکانات پلن پرو :"}</Typography>
                        <Typography variant={"caption"}> {"◄ امکان تعیین تاریخ انقضا برای اعتبار ها"}</Typography>
                        <br />
                    </CardContent>
                </Card>
            </div>
        );
    };
    function pro(remined) {
        return (
            <div className={"col-md-6"}>
                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardContent>
                        <Typography variant={"subtitle1"}>
                            {"با پرداخت مجموع "+toPriceWithComma(remined)+" تومان پلن خود را به نئو تغییر دهید."}
                        </Typography>
                        <ProgressBar className={"mt-2 mb-3"} min={200000000} now={totalIncreases} max={500000000} />

                        <Typography variant={"subtitle1"}> {"امکانات پلن نئو :"}</Typography>
                        <Typography variant={"caption"}> {"◄ امکان اعتبار دهی پرسنل تا 3 برابر شارژ واریز شده"}</Typography>
                        <br />
                    </CardContent>
                </Card>
            </div>
        );
    };
    function neo(remined) {
        return (<></>)
        // return (
        //     <div className={"col-md-6"}>
        //         <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
        //             <CardContent>
        //                 {toPriceWithComma(remined)}
        //             </CardContent>
        //         </Card>
        //     </div>
        // );
    };
};

export default _CorporatePlan;
