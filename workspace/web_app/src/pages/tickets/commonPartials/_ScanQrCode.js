import React, { useContext, useEffect, useState, useCallback } from "react";
import {
    Alert,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
} from "@mui/material";
import { CropFree } from "@mui/icons-material";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";

import { link_getByCode } from "../../../network/api/link.api";
import {
    purchasedSubscribe_addEnterToSubscribe,
} from "../../../network/api/purchasedSubscribe.api";
import { ErrorContext } from "../../../components/GympinPagesProvider";

import checkAnim from "./check.json";
import doneAnim from "./done.json";
import _ScannerCore from "../../qrCode/scanner/_ScannerCore";

const ScanQrCode = ({ ticket }) => {
    const error = useContext(ErrorContext);
    const currentUser = useSelector((state) => state.auth.user);

    const [firstLogin] = useState(ticket?.EntryList?.length === 0);
    const [scannedCode, setScannedCode] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const [paymentSerial, setPaymentSerial] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const checkOptions = {
        loop: true,
        autoplay: true,
        animationData: checkAnim,
        rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
    };

    const doneOptions = {
        loop: false,
        autoplay: true,
        animationData: doneAnim,
        rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
    };

    const handleError = useCallback(
        (message) => {
            error.showError({ message: message || "خطا در عملیات" });
        },
        [error]
    );

    useEffect(() => {
        if (!scannedCode) return;

        link_getByCode({ code: scannedCode })
            .then((res) => {
                const fetchedPlaceId = res.data.Data.Value1;
                if (
                    fetchedPlaceId.toString() !==
                    ticket.TicketSubscribe.Place.Id.toString()
                ) {
                    handleError("بلیط مربوط به این مرکز نیست!");
                    setScannedCode(null);
                    setPlaceId(null);
                } else {
                    setPlaceId(fetchedPlaceId);
                }
            })
            .catch(() => {
                handleError("کد نامعتبر");
                setScannedCode(null);
                setPlaceId(null);
            });
    }, [scannedCode, ticket, handleError]);

    /** ثبت ورود */
    const handleEnter = useCallback(
        async (isFirstLogin = false) => {
            if (isSubmitting) return;
            setIsSubmitting(true);
            setPlaceId(null);
            handleError("لطفا صبر کنید...");

            try {
                const result = await purchasedSubscribe_addEnterToSubscribe({
                    Id: ticket.Id,
                    User: { Id: currentUser.Id },
                });

                setScannedCode(null);

                if (isFirstLogin) {
                    const serial = result.data.Data.Serial.find(
                        (s) => s.ProcessType === "TRA_USE_TICKET"
                    );
                    setPaymentSerial(serial);
                } else {
                    handleError("ورود شما با موفقیت ثبت شد");

                }
            } catch (e) {
                handleError(e?.response?.data?.Message);
                setScannedCode(null);
                setPlaceId(null);
            } finally {
                setIsSubmitting(false);
            }
        },
        [ticket, currentUser, handleError, isSubmitting]
    );


    const actionOnScan = (text) =>
        text.startsWith("http") ? text.split("/").pop() : text;

    const renderModalScan = () => (
        <Dialog open={!!scannedCode} onClose={() => setScannedCode(null)}>
            {placeId && firstLogin && (
                <>
                    <DialogTitle>ثبت اولین ورود و پرداخت به مجموعه</DialogTitle>
                    <DialogContent>
                        <Alert sx={{ mt: 1 }} severity="warning" variant="outlined">
                            تایید این پیام به منزله پرداخت به مجموعه میباشد و پس از آن وجه
                            پرداختی به هیچ عنوان عودت نخواهد شد!
                        </Alert>
                        <Alert sx={{ mt: 1 }} severity="info" variant="outlined">
                            آیا از ثبت اولین ورود و پرداخت به مجموعه اطمینان دارید؟
                        </Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            sx={{ m: 1, p: 3 }}
                            fullWidth
                            variant="contained"
                            color="success"
                            onClick={() => handleEnter(true)}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "در حال ثبت..." : "تایید و ثبت اولین ورود"}
                        </Button>
                    </DialogActions>
                </>
            )}

            {placeId && !firstLogin && (
                <>
                    <DialogTitle>ثبت ورود</DialogTitle>
                    <DialogContent>
                        <Alert sx={{ mt: 1 }} severity="success" variant="outlined">
                            ورزش خوبی داشته باشید!
                        </Alert>
                        <Lottie options={doneOptions} height={300} width={300} />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            sx={{ m: 1, p: 3 }}
                            fullWidth
                            variant="contained"
                            color="success"
                            onClick={() => handleEnter(false)}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "در حال ثبت..." : "تایید و ثبت ورود"}
                        </Button>
                    </DialogActions>
                </>
            )}

            {!placeId && (
                <>
                    <DialogTitle>صبر کنید...</DialogTitle>
                    <DialogContent>
                        <Typography variant="subtitle1">
                            در حال دریافت اطلاعات بلیط و مجموعه ...
                        </Typography>
                        <Grid container justifyContent="center">
                            <CircularProgress sx={{ p: 1, m: 2 }} size="3rem" />
                        </Grid>
                    </DialogContent>
                </>
            )}
        </Dialog>
    );

    /** مودال موفقیت پرداخت */
    const renderModalSuccessPay = () => (
        <Dialog open={!!paymentSerial} onClose={() => setPaymentSerial(null)}>
            <DialogTitle>پرداخت موفق</DialogTitle>
            <DialogContent>
                <Alert sx={{ mt: 1 }} severity="success" variant="outlined">
                    پرداخت شما با موفقیت انجام شد
                </Alert>
                <Lottie options={checkOptions} height={300} width={300} />
                <Alert
                    sx={{
                        mt: 1,
                        "& .MuiAlert-message": { width: "100%" },
                    }}
                    severity="success"
                    variant="outlined"
                >
                    کد پیگیری پرداخت:
                    <Typography
                        variant="h4"
                        sx={{ mt: 1, width: "100%", textAlign: "center", fontWeight: 900 }}
                    >
                        {paymentSerial?.Serial?.split("-").pop()}
                    </Typography>
                </Alert>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ m: 1, p: 3 }}
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={() => setPaymentSerial(null)}
                >
                    بستن
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <div>
            <Alert
                sx={{ m: 1 }}
                variant="outlined"
                severity="info"
                icon={<CropFree />}
            >
                لطفا QR کد جیم پین داخل مجموعه را اسکن کنید
            </Alert>
            <_ScannerCore
                scannWork={!scannedCode}
                actionOnScan={actionOnScan}
                onFind={(code) => !scannedCode && setScannedCode(code)}
            />
            {renderModalScan()}
            {renderModalSuccessPay()}
        </div>
    );
};

export default ScanQrCode;
