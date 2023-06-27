import React, {useContext, useState} from 'react';
import {
    Button,
    Card,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Switch,
    TextField
} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {place_changeStatus} from "../../network/api/place.api";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {PlaceAbout_add} from "../../network/api/placeAbout.api";
import {Form} from "react-bootstrap";

const _ListItem = (props) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [openModalDeactive,setOpenModalDeactive] = useState(false);

    function changePlaceStatus(e) {
        if(!place)return;
        place_changeStatus({
            Id:place.Id,
            Status:e.target.checked?"ACTIVE":"INACTIVE"
        }).then(result=>{
            if(!place) return;
            props.RequestPlace(place.Id)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    if(!place)
        return (<></>);

    function renderModalDeactiveReson() {

        function acceptDeactive(e) {
            e.preventDefault()
            console.log(e.target.title.value);
             if(e.target.title.value) {
                 changePlaceStatus({target: {checked: false}});
                 setOpenModalDeactive(false)
             }else{
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

    return (
        <>
            <Card elevation={3} sx={{margin: 1}} >
                <CardHeader
                    component={"a"}
                    sx={{textDecoration:"none",color:"#000000"}}
                    href={props.destination}
                    title={"وضعیت مرکز"}
                    action={(<>
                        فعال
                        <Switch onChange={(e)=>(e.target.checked)?changePlaceStatus(e):setOpenModalDeactive(true)} checked={place.Status=="ACTIVE"} />
                    </>)}/>
            </Card>
            {renderModalDeactiveReson()}
        </>
    );
};


export default connect(null, sagaActions)(_ListItem)
