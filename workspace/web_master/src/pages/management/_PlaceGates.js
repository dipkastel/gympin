import {React, useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControlLabel,
    List,
    ListItem,
    ListItemText,
    Switch,
    TextField
} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {Gates_add, Gates_getByPlace} from "../../network/api/gates.api";
import {Form} from "react-bootstrap";
import {placeActions} from "../../helper/redux/actions/PlaceActions";
import {ErrorContext} from "../../components/GympinPagesProvider";

const _PlaceGates = (props) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const gates = useSelector(({place}) => place.gates)
    const [openModalAdd, setOpenModalAdd] = useState(false);

    useEffect(() => {
        getPlaceGates();
    }, []);

    function getPlaceGates() {
        Gates_getByPlace({Id: place.Id}).then(result => {
            props.SetGates(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    function ModalAddGate() {
        function addGate(e) {
            e.preventDefault()
            Gates_add({
                Name: e.target.Name.value,
                place:{Id:place.Id},
                TrafficManagement:e.target.Traffic.checked
            }).then(result=>{
                getPlaceGates();
                setOpenModalAdd(false)
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
        }

        return (
            <div>
                <Dialog open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                    <Form onSubmit={addGate}>
                        <DialogTitle>افزودن درگاه</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                برای افزودن درگاه جدید نام درگاه را وارد کنید
                                <br/>
                                مثال : بدنسازی یا پیلاتس
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                name={"Name"}
                                label="نام درگاه"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <FormControlLabel
                                name={"Traffic"}
                                control={<Switch defaultChecked/>} label="مدیریت ترافیک"/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenModalAdd(false)}>لغو</Button>
                            <Button type={"submit"}>ثبت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    sx={{paddingBottom: 0}}
                    title={"درگاه های مجموعه"}
                    action={<Button variant={"contained"} title={"btn_add"} onClick={() => setOpenModalAdd(true)}>افزودن
                        درگاه</Button>}/>

                <CardContent sx={{margin: 0, paddingTop: 0}}>
                    <List>
                        {gates && gates.map((item, number) => (<div key={"gate-"+number}>
                                <ListItem component="a" href={"/management/gate/"+item.Id} alignItems="flex-start"
                                          sx={{width: '100%', bgcolor: 'background.paper', color: "#000000"}}>
                                    <ListItemText
                                        className="text-start"
                                        primary={item.Name}
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li"/>
                            </div>
                        ))}
                    </List>
                </CardContent>
            </Card>
            {ModalAddGate()}
        </>

    );
};

export default connect(null, placeActions)(_PlaceGates)
