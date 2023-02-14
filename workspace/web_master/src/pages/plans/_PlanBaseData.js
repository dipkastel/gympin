import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Form} from "react-bootstrap";
import {genders} from "../../helper/enums/genders";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from "@mui/x-date-pickers";
import AdapterJalaali from '@date-io/jalaali';
import {planExpireTypes} from "../../helper/enums/planExpireTypes";
import {Plans_update} from "../../network/api/plans.api";

const _PlanBaseData = ({plan, getPlanData}) => {

    const [inPlan, setInPlan] = useState({})
    const [sellInTime, SetSellInTime] = useState(false)

    useEffect(() => {
        setInPlan(plan);
        SetSellInTime((!!plan.Start_selling_date) || (!!plan.End_selling_date))
    }, [plan]);

    function updatePlan(e) {
        e.preventDefault();
        Plans_update(inPlan).then(result => {
            getPlanData();
        }).catch(e => console.log(e));
    }

    return (
        <>
            <Form onSubmit={(e) => updatePlan(e)}>
                <Card elevation={3} sx={{margin: 1}}>
                    <CardHeader
                        sx={{paddingBottom: 0}}
                        title={"ویرایش"}
                        action={(
                            <>
                                {inPlan.Enable ?
                                    <Typography variant={"caption"}>فعال</Typography>
                                    :
                                    <Typography variant={"caption"}>غیر فعال</Typography>}
                                <Switch
                                    checked={!!inPlan.Enable}
                                    onChange={(e) => setInPlan({...inPlan, Enable: e.target.checked})}
                                />
                                <Typography variant={"caption"}>حذف</Typography>
                                <DeleteIcon
                                    onClick={(e) => {
                                    }}
                                    color={"primary"}
                                />
                            </>
                        )}
                    />
                    <CardContent sx={{margin: 0}}>

                        <TextField
                            name={"Name"}
                            value={inPlan.Name || ""}
                            onChange={(e) => setInPlan({...inPlan, Name: e.target.value})}
                            margin="dense"
                            label="نام پلن"
                            type="text"
                            fullWidth
                            variant="standard"
                        />

                        <FormControl variant="standard"
                                     fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">جنسیت</InputLabel>
                            <Select
                                value={inPlan["Gender"] || ""}
                                onChange={(e) => setInPlan({...inPlan, Gender: e.target.value})}
                                label="جنسیت"
                                fullWidth
                            >
                                <MenuItem>انتخاب کنید</MenuItem>
                                {Object.keys(genders).map(g => (
                                    <MenuItem key={g} value={g}>{genders[g]}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            name={"Price"}
                            value={inPlan.Price || ""}
                            onChange={(e) => setInPlan({...inPlan, Price: e.target.value})}
                            margin="dense"
                            label="قیمت پلن"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            name={"ValuePrice"}
                            value={inPlan.ValuePrice || ""}
                            onChange={(e) => setInPlan({...inPlan, ValuePrice: e.target.value})}
                            margin="dense"
                            label="ارزش پلن"
                            type="number"
                            fullWidth
                            variant="standard"
                        />

                        <TextField
                            name={"EntryTotalCount"}
                            value={inPlan.EntryTotalCount || ""}
                            onChange={(e) => setInPlan({...inPlan, EntryTotalCount: e.target.value})}
                            margin="dense"
                            label="تعداد ورود"
                            type="number"
                            fullWidth
                            variant="standard"
                        />

                        <FormControl variant="standard"
                                     fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">تاریخ انقضا</InputLabel>
                            <Select
                                value={inPlan["Expire_type"] || ""}
                                onChange={(e) => setInPlan({...inPlan, Expire_type: e.target.value})}
                                label="تاریخ انقضا"
                                fullWidth
                            >
                                <MenuItem>انتخاب کنید</MenuItem>
                                {Object.keys(planExpireTypes).map(g => (
                                    <MenuItem key={g} value={g}>{planExpireTypes[g]}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {(inPlan.Expire_type == "Date") &&
                        <LocalizationProvider
                            dateAdapter={AdapterJalaali}>
                            <DatePicker
                                className={"ltr datePicker"}
                                inputFormat={"jYYYY/jMM/jDD"}
                                label="تاریخ اتمام اعتبار"
                                value={inPlan.Expire_date}
                                onChange={(e) => setInPlan({...inPlan, Expire_date: e})}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        }
                        {(inPlan.Expire_type == "Duration") &&
                        <TextField
                            name={"Expire_duration"}
                            value={inPlan.Expire_duration || ""}
                            onChange={(e) => setInPlan({...inPlan, Expire_duration: e.target.value})}
                            margin="dense"
                            label="تعداد روز از تاریخ خرید"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        }

                        <FormGroup>
                            <FormControlLabel
                                control={<Switch
                                    checked={sellInTime}
                                    onChange={(e) => {
                                        setInPlan({...inPlan, End_selling_date: null, Start_selling_date: null})
                                        SetSellInTime(e.target.checked)
                                    }}
                                    value="gilad"/>}
                                label="فروش فقط برای زمان مشخص"
                            />
                        </FormGroup>
                        {sellInTime && (
                            <>
                                <LocalizationProvider
                                    dateAdapter={AdapterJalaali}>
                                    <DatePicker
                                        className={"ltr datePicker"}
                                        fullWidth
                                        inputFormat={"jYYYY/jMM/jDD"}
                                        label="فروش این پلن از تاریخ"
                                        value={inPlan.Start_selling_date}
                                        onChange={(e) => setInPlan({...inPlan, Start_selling_date: e})}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider
                                    dateAdapter={AdapterJalaali}>
                                    <DatePicker
                                        className={"ltr datePicker"}
                                        fullWidth
                                        inputFormat={"jYYYY/jMM/jDD"}
                                        label="فروش این پلن تا تاریخ"
                                        value={inPlan.End_selling_date}
                                        onChange={(e) => setInPlan({...inPlan, End_selling_date: e})}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </>
                        )}

                        <FormControl fullWidth>
                            <Button variant={"contained"} type={"submit"}>ثبت</Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </Form>
        </>
    );
};

export default _PlanBaseData;
