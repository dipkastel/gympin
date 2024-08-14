import React, {useContext, useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Card,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Switch,
    TextField, Typography
} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {place_changeStatus} from "../../network/api/place.api";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {Form} from "react-bootstrap";
import {getWizardComplete} from "../../helper/pocket";

const _PlaceActivity = (props) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [openModalDeactive, setOpenModalDeactive] = useState(false);
    const introMode = !getWizardComplete()

    useEffect(() => {
        if(place&&introMode)
            props.setIntroCanGoNext(place.Status== "ACTIVE");
    }, [place]);



    function changePlaceStatus(status) {
        if (!place) return;
        place_changeStatus({
            Id: place.Id,
            Status: status
        }).then(result => {
            if (!place) return;
            props.RequestPlace(place.Id)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    if (!place)
        return (<></>);

    if(!props.ShowIfActive&&place.Status == "ACTIVE")
        return (<></>);


    function renderModalDeactiveReson() {

        function acceptDeactive(e) {
            e.preventDefault()
            if (e.target.title.value) {
                changePlaceStatus("INACTIVE");
                setOpenModalDeactive(false)
            } else {
                error.showError({message: "دلیل غیر فعال سازی الزامی است",});
            }
        }

        return (
            <div>
                <Dialog fullWidth open={openModalDeactive} onClose={() => setOpenModalDeactive(false)}>
                    <Form onSubmit={(e) => acceptDeactive(e)}>
                        <DialogTitle>غیر فعال سازی مرکز</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="title"
                                label="دلیل غیر فعالسازی مرکز"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenModalDeactive(false)}>لغو</Button>
                            <Button variant={"contained"} color={"primary"} type={"submit"}>غیر فعال سازی</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )
    }

    function setShow(b) {

    }

    return (
        <>
            {place.Status == "ACTIVE" ? <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    component={"a"}
                    sx={{textDecoration: "none", color: "#000000"}}
                    href={props.destination}
                    title={"وضعیت مرکز"}
                    action={(<>
                        فعال
                        <Switch onChange={(e) => setOpenModalDeactive(true)}
                                checked={place.Status == "ACTIVE"}/>
                    </>)}/>
            </Card> : <Alert
                sx={{m:1,direction:"rtl"}}
                severity={"error"}
                action={<Button color={"error"} size="small" variant={"contained"} onClick={e=>changePlaceStatus("ACTIVE")}>
                    فعالسازی
                </Button>}
            >
                <Typography variant={"subtitle1"}>
                    مرکز شما غیر فعال است .
                </Typography>
                <Typography variant={"subtitle2"}>
                    لطفا برای مشاهده مرکز توسط کاربران نسبت به فعالسازی اقدام نمایید.
                </Typography>
            </Alert>}
            {renderModalDeactiveReson()}
        </>
    );
};


export default connect(null, sagaActions)(_PlaceActivity)
