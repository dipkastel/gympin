import React from 'react';
import {Button, Card, CardContent, CardHeader, TextField} from "@mui/material";

const _TicketAddForm = () => {
    return (
        <Card elevation={3} sx={{margin:1}}>
            <CardHeader
                title={"افزودن یادداشت"}
                action={(
                    <>
                        <Button variant={"outlined"}>ارسال</Button>
                    </>
                )}
            />
            <CardContent>
                <TextField
                    id="outlined-message"
                    className="w-100"
                    aria-multiline
                    variant="outlined"
                    margin="normal"
                    name="message"
                    type="text"
                    label={"یادداشت جدید"}
                    multiline
                />
            </CardContent>
        </Card>
    );
};

export default _TicketAddForm;
