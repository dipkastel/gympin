import React, {useContext, useRef, useState} from 'react';
import {Button, Card, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import {Cached} from "@mui/icons-material";
import SignatureCanvas from "react-signature-canvas";
import {media_AddImage} from "../../../network/api/multimedia.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const __ContractSignSign = ({setCurrentMood,place,contract}) => {

    const sigCanvas = useRef(null);
    const currentUser = useSelector((state) => state.auth.user);
    const error = useContext(ErrorContext);

    const clearBoard = () => {
        if (sigCanvas.current) {
            sigCanvas.current.clear();
        }
    };

    const handleConfirm = async () => {
        if (!sigCanvas.current) return;

        // چک می‌کنیم که چیزی کشیده شده باشد
        if (sigCanvas.current.isEmpty()) {
            error.showError({ message: 'لطفاً امضا کنید' });
            return;
        }

        try {
            // گرفتن canvas خام
            const canvas = sigCanvas.current.getCanvas();

            // تبدیل به Blob (بهتر از toDataURL برای آپلود)
            canvas.toBlob(async (blob) => {
                if (!blob) {
                    error.showError({ message: 'خطا در تولید تصویر امضا' });
                    return;
                }

                const file = new File([blob], 'signature.png', { type: 'image/png' });

                const formData = new FormData();
                formData.append('MediaType', 'IMAGE');
                formData.append('File', file);
                formData.append('CategoryId', '3');
                formData.append("Title", "امضای تفاهم‌نامه "+place.Id+" - "+place.Name+ " - "+contract.ownerName);
                formData.append("Description", "امضا شده توسط "+currentUser.FullName);

                error.showError({ message: 'لطفا صبر کنید...' });

                try {
                    const mediaResponse = await media_AddImage(formData);

                    const mediaId = mediaResponse?.data?.Data?.Id;

                    if (!mediaId) {
                        throw new Error('شناسه رسانه دریافت نشد');
                    }

                    error.showError({ message: 'ثبت موفق' });
                    setCurrentMood("confirm");
                } catch (err) {
                    console.error(err);
                    const message =
                        err?.response?.data?.Message || 'خطا در ثبت امضا';
                    error.showError({ message });
                }
            }, 'image/png', 0.92); // کیفیت 92%
        } catch (err) {
            console.error(err);
            error.showError({ message: 'خطا در پردازش تصویر' });
        }
    };

    return (
        <Dialog open={true} >
            <DialogTitle >{"امضای تفاهم نامه"}</DialogTitle>

            <DialogContent>
                <Typography variant={"subtitle1"} > لطفا درون کادر زیر را امضا نمایید : </Typography>
                <div>
                    <Card variant={"outlined"} >
                        <CardHeader action={<IconButton onClick={(e)=>clearBoard(e)} > <Cached /></IconButton>} />
                        <SignatureCanvas
                            ref={sigCanvas}
                            backgroundColor={"#FDFDFD"}
                            canvasProps={{width: 600, height: 400, className: 'sigCanvas'}} />
                    </Card>
                </div>
            </DialogContent>
            <DialogActions>
                <Button size={"large"} variant={"contained"} color={"error"} onClick={()=>setCurrentMood('')}>لغو</Button>
                <Button size={"large"} variant={"contained"} color={"success"} onClick={handleConfirm}>تایید</Button>
            </DialogActions>
        </Dialog>
    );
};

export default __ContractSignSign;
