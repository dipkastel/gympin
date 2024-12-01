import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, FormControl, FormControlLabel, Grid, Switch, TextField, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {Form} from "react-bootstrap";
import {corporate_updateContract} from "../../../network/api/corporate.api";
import store from "../../../helper/redux/store";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";

const WPageContractData = ({onNext}) => {

    const error = useContext(ErrorContext);
    const [contranct, SetContract] = useState({});
    const [thatsMe, SetThatsMe] = useState(false);
    const corporate = useSelector(({corporate}) => corporate.corporate);
    const user = useSelector(state => state.auth.user);
    const [introCanGoNext, setIntroCanGoNext] = useState(false);

    useEffect(() => {
        if (corporate?.Status !== "PREREGISTER")
            window.location = "/";
    }, []);

    useEffect(() => {
        if (thatsMe) {
            SetContract({
                ...contranct,
                ownerName: user.FullName,
                ownerPhoneNumber: user.PhoneNumber,
                ownersNationalCode: user.NationalCode,

            })
        } else {
            if (corporate.ContractData) {
                SetContract(JSON.parse(corporate?.ContractData));
            } else {
                SetContract({
                    ...contranct,
                    ownerName: "",
                    ownerPhoneNumber: "",
                    ownersNationalCode: ""
                })
            }
        }
    }, [thatsMe, corporate]);


    function updateCorporate(e) {
        e.preventDefault()
        if (!contranct.ownerName) {
            error.showError({message: "نام و نام خانوادگی مدیر شرکت / سازمان ",});
            return;
        }
        if (!contranct.ownerPhoneNumber) {
            error.showError({message: "شماره همراه مدیر شرکت / سازمان",});
            return;
        }
        if (!contranct.ownersNationalCode) {
            error.showError({message: "کد ملی مدیر شرکت / سازمان",});
            return;
        }
        if (!contranct.registrationNumber) {
            error.showError({message: "شماره ثبت شرکت / سازمان",});
            return;
        }
        if (!contranct.nationalId) {
            error.showError({message: "شناسه ملی شرکت / سازمان",});
            return;
        }

        corporate_updateContract({
            Id: corporate.Id,
            ContractData: JSON.stringify(contranct)
        }).then(result => {

            store.dispatch(sagaActions.RequestCorporate(corporate));
            setIntroCanGoNext(true);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })

    }

    return (
        <div>

            <Form onSubmit={(e) => updateCorporate(e)}>
                <Card elevation={3} sx={{borderRadius: 3, margin: 1}}>
                    <CardContent>

                        <Typography variant={"body2"}>اطلاعات طرف قرارداد (مدیر شرکت / سازمان) را وارد نمایید : </Typography>
                        <FormControlLabel
                            name={"Renew"}
                            checked={thatsMe}
                            onChange={(e) => SetThatsMe(e.target.checked)}
                            control={<Switch/>}
                            label={"خودم هستم"}/>


                        <TextField
                            name={"OwnerName"}
                            value={contranct.ownerName}
                            disabled={thatsMe}
                            onChange={(e) => SetContract({...contranct, ownerName: e.target.value})}
                            margin="dense"
                            label="نام و نام خانوادگی*"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            name={"ownerPhoneNumber"}
                            value={contranct.ownerPhoneNumber}
                            disabled={thatsMe}
                            onChange={(e) => SetContract({...contranct, ownerPhoneNumber: e.target.value})}
                            margin="dense"
                            label="شماره همراه*"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        {!thatsMe &&
                        <Typography  color={"gray"} variant={"caption"}>شماره همراه طرف قرارداد در مرحله بعد اعتبار سنجی خواهد شد لذا حضور وی در هنگام پرکردن
                            این فرم الزامی است </Typography>}
                        <TextField
                            name={"ownersNationalCode"}
                            value={contranct.ownersNationalCode}
                            disabled={thatsMe}
                            onChange={(e) => SetContract({...contranct, ownersNationalCode: e.target.value})}
                            margin="dense"
                            label="کد ملی*"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            name={"OwnerPosition"}
                            value={contranct.ownerPosition}
                            onChange={(e) => SetContract({...contranct, ownerPosition: e.target.value})}
                            margin="dense"
                            label="سمت طرف قرارداد*"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            name={"registrationNumber"}
                            value={contranct.registrationNumber}
                            onChange={(e) => SetContract({...contranct, registrationNumber: e.target.value})}
                            margin="dense"
                            label="شناسه ثبت*"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        <Typography color={"gray"} variant={"caption"}>درصورتی که شماره ثبت وجود ندارد 0 وارد شود</Typography>

                        <TextField
                            name={"nationalId"}
                            value={contranct.nationalId}
                            onChange={(e) => SetContract({...contranct, nationalId: e.target.value})}
                            margin="dense"
                            label="شناسه ملی*"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        <Typography color={"gray"} variant={"caption"}>درصورتی که شناسه ملی وجود ندارد 0 وارد
                            شود</Typography>


                            <Button fullWidth sx={{mt: 1}} variant={"contained"} type={"submit"}>ثبت</Button>
                    </CardContent>
                </Card>
            </Form>
            <Grid sx={{p: 2}}>
                <Button onClick={(e) => onNext()} disabled={!introCanGoNext} fullWidth variant={"contained"} color={"primary"}>بعدی</Button>
            </Grid>
        </div>
    );
};

export default WPageContractData;
