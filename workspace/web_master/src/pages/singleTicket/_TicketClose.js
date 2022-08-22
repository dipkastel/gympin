import React from 'react';
import {Button, Card, CardContent, CardHeader, Typography} from "@mui/material";

const _TicketClose = () => {
    return (
        <Card elevation={3} sx={{margin:1}}>
            <CardHeader
                title={"بستن تیکت"}
                action={(
                    <>
                        <Button variant={"outlined"}>لغو تیکت</Button>
                    </>
                )}
            />
            <CardContent>
                <Typography variant="body1">در صورتی که مشکل حل شده است و یا دیگر نیاز به پیگیری از سمت جیم پین ندارد میتوانید تیکت را ببندید.</Typography>
            </CardContent>
        </Card>
    );
};
export default _TicketClose;
