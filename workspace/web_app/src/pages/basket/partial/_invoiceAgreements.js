import React, {useContext, useEffect, useState} from 'react';
import {PlaceAbout_getAllAboutByPlaces} from "../../../network/api/placeAbout.api";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    FormControlLabel,
    FormGroup,
    Grid,
    Switch
} from "@mui/material";
import {ErrorContext} from "../../../components/GympinPagesProvider";


const _invoiceAgreements = ({userBasket, setAcceptAgreements}) => {

    const error = useContext(ErrorContext);
    const [acceptableTerm, setAcceptableTerm] = useState([]);
    const [checkedItem, setCheckedItem] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getAbouts();
    }, [userBasket]);

    useEffect(() => {
        setAcceptAgreements(checkForAcceptAll());
    }, [checkedItem, acceptableTerm]);

    function getAbouts() {
        PlaceAbout_getAllAboutByPlaces(userBasket?.InvoiceSubscribe?.map(b => ({Id: b.Place.Id}))).then(result => {
            setAcceptableTerm(result.data.Data.filter(ap => ap.Acceptable));
            setLoading(false);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function changeCheckedItem(Id, e) {
        if (checkedItem.includes(Id)) {
            setCheckedItem(checkedItem.filter(c => c != Id))
        } else {
            setCheckedItem([...checkedItem, Id])
        }
    }

    function checkForAcceptAll() {
        var result = true;
        if (loading) {
            result = false;
        }
        if (!checkedItem.includes(0)) {
            result = false;
        }
        acceptableTerm.filter(a => a.Acceptable).map(item => {
            if (!checkedItem.includes(item.Id)) {
                result = false;
            }
        })
        return result;
    }

    const [itemToView, setItemToView] = useState(null);

    function renderModalView() {
        return (<>
            <Dialog
                sx={{zIndex: 9999999999}}
                className={"w-100"}
                open={itemToView !== null} onClose={() => setItemToView(null)}>
                <DialogContent>{itemToView.Description}</DialogContent>
            </Dialog>
        </>)
    }


    return (
        <div>
            {loading &&<CircularProgress/>}
            {checkedItem &&
            <FormGroup>
                {acceptableTerm && acceptableTerm.map((item, Number) => (<div key={Number}>
                    <Grid
                        container
                        sx={{width: "100%"}}
                        direction="row"
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        columns={15}
                    >
                        <Grid item xs={12}>
                            <FormControlLabel sx={{m: 0}} onChange={(e) => changeCheckedItem(item.Id, e)}
                                              control={<Switch checked={checkedItem?.includes(item.Id)}/>}
                                              label={item.Name + " مجموعه " + item?.Place?.Name + " را می پذیرم"}/>
                        </Grid>
                        <Grid item xs={3}>
                            <Button size={"small"} onClick={() => {
                                setItemToView(item)
                            }} variant={"text"}> مشاهده</Button>
                        </Grid>
                    </Grid>
                </div>))}

                <Grid
                    container
                    sx={{width: "100%"}}
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    columns={15}
                >

                    <Grid item xs={12}>
                        <FormControlLabel sx={{m: 0}} onChange={(e) => changeCheckedItem(0, e)}
                                          control={<Switch checked={checkedItem?.includes(0)}/>}
                                          label={"قوانین و مقررات جیم پین را می پذیرم"}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Button size={"small"} target={"_blank"} href={"https://gympin.ir/term-and-conditions"}
                                variant={"text"}> مشاهده</Button>
                    </Grid>
                </Grid>
            </FormGroup>
            }

            {itemToView && renderModalView()}
        </div>
    );
};

export default _invoiceAgreements;
