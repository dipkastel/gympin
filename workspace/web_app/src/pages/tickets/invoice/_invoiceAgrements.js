import React, {useEffect, useState} from 'react';
import {PlaceAbout_getByPlace} from "../../../network/api/placeAbout.api";
import {
    Button,
    Card,
    CardContent,
    CardHeader, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControlLabel,
    FormGroup,
    Grid,
    Switch,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";


const _invoiceAgrements = ({plan,setAllAgrementChecked}) => {

    const navigate = useNavigate();
    const [about, setAbout] = useState(null);
    const [itemToView, setItemToView] = useState(null);
    const [checkedItem,setCheckedItem] = useState([]);
    useEffect(() => {
        getAbouts();
    }, [plan]);

    function getAbouts() {
        PlaceAbout_getByPlace({Id: plan.Place.Id}).then(result => {
            setAbout(result.data.Data);
            var checkableItems = [];
            checkableItems.push({Id:0,checked:false})
            result.data.Data.filter(a=>a.Acceptable).map((item,Number)=>{
                checkableItems.push({Id:item.Id,checked:false})
            })
            setCheckedItem(checkableItems)
        }).catch(e => console.log(e));
    }

    function renderModalView(){
        return(<>
            <Dialog
                className={"w-100"}
                open={itemToView!==null} onClose={() => setItemToView(null)}>
                <DialogContent>{itemToView.Description}</DialogContent>
            </Dialog>
        </>)
    }

    function changeChecedItem(Id,e){
        var chItem = checkedItem.map(p=>(p.Id==Id)?{...p,checked:e.target.checked}:p);
        var allChecked = !chItem.some(p=>!p.checked);
        setAllAgrementChecked(allChecked);
        setCheckedItem(chItem);
    }

    return (
        <div>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader title={"قوانین و مقررات"}/>

                <CardContent>
                    <FormGroup>
                        {about&&about.filter(a=>a.Acceptable).map((item,Number)=>(<div key={Number}>
                            <Grid
                                container
                                sx={{width:"100%"}}
                                direction="row"
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <FormControlLabel onChange={(e)=>changeChecedItem(item.Id,e)} control={<Switch />} label={item.Name+" مجموعه را می پذیرم"} />
                                <Button size={"small"} onClick={()=>{setItemToView(item)}} variant={"text"}> مشاهده</Button>
                            </Grid>
                        </div>))}

                        <Grid
                            container
                            sx={{width:"100%"}}
                            direction="row"
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <FormControlLabel onChange={(e)=>changeChecedItem(0,e)}  control={<Switch />} label={"قوانین و مقررات جیمپین را می پذیرم"} />
                            <Button size={"small"} href={"https://gympin.ir/term-and-conditions"} variant={"text"}> مشاهده</Button>
                        </Grid>
                    </FormGroup>
                </CardContent>

            </Card>
            {itemToView&&renderModalView()}
        </div>
    );
};

export default _invoiceAgrements;
