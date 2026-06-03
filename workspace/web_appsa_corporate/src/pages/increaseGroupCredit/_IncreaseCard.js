import React, {useState} from 'react';
import {Button, Card, CardContent, CardHeader, TextField, Typography} from "@mui/material";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {Form} from "formik";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFnsJalali} from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

const _IncreaseCard = ({groups,group,key,selectedTab,openModalConfirmForm}) => {

    const [formData,setFormData] = useState({})
    return (<Card hidden={group.Id !== groups[selectedTab - 1].Id} key={key} elevation={3} sx={{margin: 1}}>
            <CardHeader
                titleTypographyProps={{variant: "body2"}}
                title={"اعتبار به هر یک از پرسنل گروه " + group.Name}
            />
            <CardContent>
                <Form onSubmit={(e) => openModalConfirmForm(e, group,formData)}>
                    <TextField
                        autoFocus
                        sx={{mt:2}}
                        name={"CreditAmount"}
                        label="نام اعتبار"
                        type="text"
                        value={formData.Name}
                        onChange={(e) => setFormData({...formData,Name:e.target.value})}
                        fullWidth
                        variant={"outlined"}
                    />
                    {(corporate.ContractType!="ALPHA")&&<LocalizationProvider dateAdapter={AdapterDateFnsJalali} >
                        <DatePicker
                            value={formData?.ExpireDate}
                            sx={{mt: 2, mb: 1}}
                            name={"ExpireDate"}
                            label={"تاریخ انقضا"}
                            onChange={(e)=>setFormData({...formData,ExpireDate:e})}
                            className="w-100"
                        />
                    </LocalizationProvider>}
                    <TextField
                        autoFocus
                        margin="dense"
                        name={"CreditAmount"}
                        label="تومان"
                        type="text"
                        value={toPriceWithComma(formData.CreditAmount)}
                        onChange={(e) => setFormData({...formData,CreditAmount:toPriceWithoutComma(e.target.value)})}
                        fullWidth
                        variant={"outlined"}
                    />

                    <Typography variant={"body2"}>
                        {/*{'مجموع اعتبار اضافه شده به پرسنل '+toPriceWithComma(credit*PersonelCount)+' تومان می باشد'}*/}
                    </Typography>
                    <Button variant={"outlined"} sx={{margin: 1}}
                            type={"submit"}>ثبت</Button>
                </Form>
            </CardContent>
        </Card>
    );
};

export default _IncreaseCard;
