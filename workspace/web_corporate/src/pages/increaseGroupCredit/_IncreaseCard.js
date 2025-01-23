import React from 'react';
import {Button, Card, CardContent, CardHeader, TextField, Typography} from "@mui/material";
import {toPriceWithComma} from "../../helper/utils";
import {Form} from "formik";

const _IncreaseCard = ({groups,group,key,selectedTab,openModalConfirmForm}) => {
    return (<Card hidden={group.Id !== groups[selectedTab - 1].Id} key={key} elevation={3} sx={{margin: 1}}>
            <CardHeader
                titleTypographyProps={{variant: "body2"}}
                title={"اعتبار به هر یک از پرسنل گروه " + group.Name}
            />
            <CardContent>
                <Form onSubmit={(e) => openModalConfirmForm(e, group)}>
                    <TextField
                        margin="dense"
                        name="credit"
                        label="مقدار اعتبار (تومان)"
                        type="text"
                        onChange={(e) => {
                            e.target.value = toPriceWithComma(e.target.value)
                        }}
                        fullWidth
                        variant="standard"
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
