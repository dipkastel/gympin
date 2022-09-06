import React from 'react';
import {
    Button,
    Card,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack, TextField,
    Typography
} from "@mui/material";

const _UsersWallet = () => {
    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardContent
                    >
                    مجموع اعتبار پرسنل شما :
                    <Stack
                        justifyContent="space-between"
                        alignItems="flex-start"
                        direction="row"
                        spacing={0}
                    >
                        <Typography variant="h6" >
                            148,500,000 تومان
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
};

export default _UsersWallet;
