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
import {Halls_add, Halls_getByPlace} from "../../network/api/halls.api";
import {Form} from "react-bootstrap";
import {placeActions} from "../../helper/redux/actions/PlaceActions";
import {ErrorContext} from "../../components/GympinPagesProvider";

const _PlaceHalls = (props) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const halls = useSelector(({place}) => place.halls)
    const [openModalAdd, setOpenModalAdd] = useState(false);

    useEffect(() => {
        getPlaceHalls();
    }, []);

    function getPlaceHalls() {
        if(!place) return;
        Halls_getByPlace({Id: place.Id}).then(result => {
            props.SetHalls(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    function ModalAddHall() {
        function addHall(e) {
            e.preventDefault()
            Halls_add({
                Name: e.target.Name.value,
                place:{Id:place.Id},
                TrafficManagement:e.target.Traffic.checked
            }).then(result=>{
                getPlaceHalls();
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
                    <Form onSubmit={addHall}>
                        <DialogTitle>افزودن سالن</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                برای افزودن سالن جدید نام سالن را وارد کنید
                                <br/>
                                مثال : بدنسازی یا پیلاتس
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                name={"Name"}
                                label="نام سالن"
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
                    title={"سالن های مجموعه"}
                    action={<Button variant={"contained"} title={"btn_add"} onClick={() => setOpenModalAdd(true)}>افزودن
                        سالن</Button>}/>

                <CardContent sx={{margin: 0, paddingTop: 0}}>
                    <List>
                        {halls && halls.map((item, number) => (<div key={"hall-"+number}>
                                <ListItem component="a" href={"/management/hall/"+item.Id} alignItems="flex-start"
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
            {ModalAddHall()}
        </>

    );
};

export default connect(null, placeActions)(_PlaceHalls)
