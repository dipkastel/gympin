import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import {Plans_add, Plans_getByPlace} from "../../network/api/plans.api";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../components/GympinPagesProvider";

const _PlaceGates = () => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [plansList, setPlansList] = useState([]);

    useEffect(() => {
        getPlacePlans();
    }, []);

    function getPlacePlans() {
        Plans_getByPlace({Id: place.Id}).then(result => {
            setPlansList(result.data.Data);
        }).catch(e => console.log(e));
    }


    function ModalAddPlan() {

        function addGate(e) {
            e.preventDefault()
            Plans_add({
                Name: e.target.Name.value,
                place:{Id:place.Id},
                EntryTotalCount:1
            }).then(result=>{
                getPlacePlans();
                setOpenModalAdd(false)
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
                console.log(e)
            }
        });
        }

        return (
            <div>
                <Dialog open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                    <Form onSubmit={addGate}>
                        <DialogTitle>افزودن درگاه</DialogTitle>
                        <DialogContent>
                            <Typography variant={"caption"}>
                                برای افزودن پلن جدید نام پلن را وارد کنید
                            </Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                name={"Name"}
                                label="نام پلن"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <Typography variant={"caption"}>
                                مثال : 12 جلسه بدنسازی آقایان،
                                ورود به استخر صبح ها
                            </Typography>
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
                    sx={{paddingBottom:0}}
                    title={"پلن های مجموعه"}
                    action={<Button variant={"contained"} title={"btn_add"} onClick={() => setOpenModalAdd(true)}>افزودن
                        پلن</Button>}

                />

                <CardContent  sx={{margin:0 ,paddingTop:0}}>
                    <List >
                        {plansList && plansList.map((item, number) => (<div key={"place-"+number}>
                                <ListItem component="a" href={"/management/plans/"+item.Id} alignItems="flex-start"
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
            {ModalAddPlan()}
        </>

    );
};

export default _PlaceGates;
