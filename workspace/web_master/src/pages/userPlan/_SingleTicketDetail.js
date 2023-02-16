import React from 'react';
import {Card, CardContent, CardHeader, TextField} from "@mui/material";

const _SingleTicketDetail = ({ticket}) => {
    return (
        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={"جزئیات بلیط"}
            />
            <CardContent>
                <TextField
                    id="outlined-adornment-password"
                    className="w-100"
                    variant="outlined"
                    margin="normal"
                    name="name"
                    type="text"
                    label={"نام کاربر"}
                    defaultValue={`${ticket.User.FullName} (${ticket.User.Username})`}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="outlined-adornment-password"
                    className="w-100"
                    variant="outlined"
                    margin="normal"
                    name="plan"
                    type="text"
                    label={"پلن"}
                    defaultValue={ticket.PlanName}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="outlined-adornment-password"
                    className="w-100"
                    variant="outlined"
                    margin="normal"
                    name="plan"
                    type="text"
                    label={"تاریخ انقضا پلن"}
                    defaultValue={new Date(ticket.PlanExpireDate).toLocaleDateString('fa-IR', {
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
                    name="plan"
                    type="text"
                    label={"تاریخ انقضا بلیط"}
                    defaultValue={new Date(ticket.ExpireDate).toLocaleDateString('fa-IR', {
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
                    name="plan"
                    type="text"
                    label={"تعداد جلسات بلیط"}
                    defaultValue={ticket.EntryTotalCount}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    id="outlined-adornment-password"
                    className="w-100"
                    variant="outlined"
                    margin="normal"
                    name="plan"
                    type="text"
                    label={"جلسات استفاده شده"}
                    defaultValue={ticket.EntryList.length}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </CardContent>
        </Card>
    );
};

export default _SingleTicketDetail;
