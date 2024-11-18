import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, FormControl, FormControlLabel, Grid, Switch, TextField, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {Form} from "react-bootstrap";
import {place_AddMultimedia, place_UpdateContract} from "../../../network/api/place.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import store from "../../../helper/redux/store";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";

const WPagePlaceOwner = ({onNext}) => {
    const error = useContext(ErrorContext);
    const [contranct, SetContract] = useState({});
    const [thatsMe, SetThatsMe] = useState(false);
    const place = useSelector(({place}) => place.place)
    const user = useSelector(state => state.auth.user)
    const [introCanGoNext, setIntroCanGoNext] = useState(false);

    useEffect(() => {
        if (thatsMe) {
            SetContract({
                ...contranct,
                ownerName: user.FullName,
                ownerPhoneNumber: user.PhoneNumber,
                ownersNationalCode: user.NationalCode,

            })
        } else {
            if(place.ContractData){
                SetContract(JSON.parse(place?.ContractData));
            }else{
                SetContract({
                    ...contranct,
                    ownerName: "",
                    ownerPhoneNumber: "",
                    ownersNationalCode: ""
                })
            }
        }
    }, [thatsMe,place]);



    function updatePlace(e) {
        e.preventDefault()
        if (!contranct.ownerName) {
            error.showError({message: "نام و نام خانوادگی صاحب امتیاز ",});
            return;
        }
        if (!contranct.ownerPhoneNumber) {
            error.showError({message: "شماره همراه صاحب امتیاز مجموعه",});
            return;
        }
        if (!contranct.ownersNationalCode) {
            error.showError({message: "کد ملی صاحب امتیاز مجموعه",});
            return;
        }
        if (!contranct.occupationLicence) {
            error.showError({message: "شماره جواز یا پروانه مجموعه",});
            return;
        }
        if (!contranct.registrationNumber) {
            error.showError({message: "شماره ثبت یا کد ملی حقوقی مجموعه",});
            return;
        }

        place_UpdateContract({
            Id:place.Id,
            ContractData:JSON.stringify(contranct)
        }).then(result => {
            store.dispatch(sagaActions.RequestPlace(place.Id));
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

            <Form onSubmit={(e) => updatePlace(e)}>
                <Card elevation={3} sx={{borderRadius: 3, margin: 1}}>
                    <CardContent>

                        <Typography variant={"body2"}>اطلاعات صاحب امتیاز مجموعه را وارد نمایید : </Typography>
                        <FormControlLabel
                            name={"Renew"}
                            checked={thatsMe}
                            onChange={(e) => SetThatsMe(e.target.checked)}
                            control={<Switch/>} label={"خودم هستم"}/>


                        <TextField
                            name={"OwnerName"}
                            value={contranct.ownerName}
                            disabled={thatsMe}
                            onChange={(e) => SetContract({...contranct, ownerName: e.target.value})}
                            margin="dense"
                            label="نام و نام خانوادگی"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        {!thatsMe &&
                        <Typography variant={"body2"}>شماره همراه صاحب مجموعه در مرحله بعد اعتبار سنجی خواهد شد لذا حضور او در هنگاه پرکردن
                            این فرم الزامی است </Typography>}
                        <TextField
                            name={"ownerPhoneNumber"}
                            value={contranct.ownerPhoneNumber}
                            disabled={thatsMe}
                            onChange={(e) => SetContract({...contranct, ownerPhoneNumber: e.target.value})}
                            margin="dense"
                            label="شماره همراه"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            name={"ownersNationalCode"}
                            value={contranct.ownersNationalCode}
                            disabled={thatsMe}
                            onChange={(e) => SetContract({...contranct, ownersNationalCode: e.target.value})}
                            margin="dense"
                            label="کد ملی"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />


                        <TextField
                            name={"occupationLicence"}
                            value={contranct.occupationLicence}
                            onChange={(e) => SetContract({...contranct, occupationLicence: e.target.value})}
                            margin="dense"
                            label="جواز کسب"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        <Typography color={"gray"} variant={"caption"}>درصورتی که جواز کسب وجود ندارد 0 وارد شود</Typography>

                        <TextField
                            name={"registrationNumber"}
                            value={contranct.registrationNumber}
                            onChange={(e) => SetContract({...contranct, registrationNumber: e.target.value})}
                            margin="dense"
                            label="شماره ثبت و یا شناسه ملی"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        <Typography color={"gray"}  variant={"caption"}>درصورتی که شماره ثبت و یا شناسه ملی وجود ندارد 0 وارد شود</Typography>


                        <FormControl sx={{mt:1}} fullWidth>
                            <Button variant={"contained"} type={"submit"}>ثبت</Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </Form>
            <Grid sx={{p: 2}}>
                <Button onClick={(e) => onNext()} disabled={!introCanGoNext} fullWidth variant={"contained"} color={"primary"}>بعدی</Button>
            </Grid>
        </div>
    );
};

export default WPagePlaceOwner;
