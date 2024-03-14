import React from 'react';
import {Card, CardContent, CardHeader, TextField} from "@mui/material";
import {SubscribeStatusEnum} from "../../../../helper/enums/SubscribeStatusEnum";

const _SingleSubscribeDetail = ({subscribe}) => {
    return (
        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={"جزئیات عضویت"}
            />
            <CardContent>
                <TextField
                    id="outlined-adornment-password"
                    className="w-100"
                    variant="outlined"
                    margin="normal"
                    name="name"
                    type="text"
                    label={"وضعیت بلیط"}
                    defaultValue={SubscribeStatusEnum[subscribe.Status]}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="outlined-adornment-password"
                    className="w-100"
                    variant="outlined"
                    margin="normal"
                    name="name"
                    type="text"
                    label={"نام کاربر"}
                    defaultValue={`${subscribe.User.FullName} (${subscribe.User.Username})`}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="outlined-adornment-password"
                    className="w-100"
                    variant="outlined"
                    margin="normal"
                    type="text"
                    label={"بلیط"}
                    defaultValue={subscribe.Name}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="outlined-adornment-password"
                    className="w-100"
                    variant="outlined"
                    margin="normal"
                    type="text"
                    label={"تاریخ انقضا بلیط"}
                    defaultValue={new Date(subscribe.TicketSubscribeExpireDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="outlined-adornment-password"
                    className="w-100"
                    variant="outlined"
                    margin="normal"
                    type="text"
                    label={"تاریخ انقضا عضویت"}
                    defaultValue={new Date(subscribe.ExpireDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="outlined-adornment-password"
                    className="w-100"
                    variant="outlined"
                    margin="normal"
                    type="text"
                    label={"تعداد جلسات عضویت"}
                    defaultValue={subscribe.EntryTotalCount}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="outlined-adornment-password"
                    className="w-100"
                    variant="outlined"
                    margin="normal"
                    type="text"
                    label={"جلسات استفاده شده"}
                    defaultValue={subscribe.EntryList.length}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </CardContent>
        </Card>
    );
};

export default _SingleSubscribeDetail;
