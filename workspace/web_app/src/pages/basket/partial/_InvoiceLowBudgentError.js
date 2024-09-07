import React from 'react';
import {Alert, AlertTitle, Card, CardContent} from "@mui/material";
import {useNavigate} from "react-router-dom";

const _InvoiceLowBudgentError = () => {

    const navigate = useNavigate();
    return (
        <div>
            <Card elevation={3} sx={{m: 1}}>
                <CardContent>
                    <Alert severity="error" onClick={(e) => navigate("/wallet")}>
                        <AlertTitle>مجموع اعتبار شما کمتر از پرداخت بلیط میباشد!</AlertTitle>
                        برای افزایش اعتبار شخصی <strong> اینجا </strong> کلیک کنید .
                    </Alert>
                </CardContent>
            </Card>
        </div>
    );
};

export default _InvoiceLowBudgentError;
