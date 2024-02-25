import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TableCell} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {placeSport_getSportsByPlace} from "../../../../../../network/api/placeSport.api";
import {
    TicketSubscribes_addSport,
    TicketSubscribes_deleteSport,
    TicketSubscribes_getTicketSubscribesSports
} from "../../../../../../network/api/ticketSubscribes.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";

const TicketSubscribeSport = ({ticketSubscribe}) => {
    const error = useContext(ErrorContext);
    const [ticketSubscribeSports, SetTicketSubscribeSports] = useState([])
    const [sportsPlace, SetSportsPlace] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    useEffect(() => {
        getPlaceSports();
    }, []);

    function getTicketSubscribeSports() {
        TicketSubscribes_getTicketSubscribesSports({ticketSubscribeId: ticketSubscribe.Id}).then(data => {
            SetTicketSubscribeSports(data.data.Data);
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }
    function getPlaceSports() {
        placeSport_getSportsByPlace({Id: ticketSubscribe.Place.Id}).then(data => {
            SetSportsPlace(data.data.Data);
            getTicketSubscribeSports();
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }


    function renderModalAdd() {
        var PlaceSportsToAdd = [];
        function addSport(e) {
            e.preventDefault()
            var PlaceSportList = [];
            for(var index in PlaceSportsToAdd){
                PlaceSportList.push( {Id:PlaceSportsToAdd[index]})
            }
            TicketSubscribes_addSport({TicketSubscribe: {Id: ticketSubscribe.Id}, PlaceSport: PlaceSportList})
                .then(data => {
                    setOpenModalAdd(false)
                    getTicketSubscribeSports()
                }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
        }

        function handleChange(sportPlaceId,status) {
            if(status)
                PlaceSportsToAdd.push(sportPlaceId)
            else
                PlaceSportsToAdd = PlaceSportsToAdd.filter(item => item !== sportPlaceId)
        }

        return (
            <>
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <form onSubmit={(e) => addSport(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن ورزش به عضویت "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <FormControl component="fieldset">
                                <FormLabel component="legend">ورزش های این مجموعه</FormLabel>
                                {sportsPlace.map(item=>{

                                    return (
                                            <FormGroup key={item.Id} aria-label="position" name="position"
                                                 onChange={(e)=>handleChange(item.Id,e.target.checked)}
                                                       row>
                                                <FormControlLabel
                                                    value="end"
                                                    sx={{marginY:0}}
                                                    control={<Checkbox color="primary" />}
                                                    label={item.sport.Name}
                                                    labelPlacement="end"
                                                />
                                            </FormGroup>
                                        )

                                })}
                            </FormControl>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setOpenModalAdd(false)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                اضافه
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }

    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            TicketSubscribes_deleteSport({TicketSubscribe:{Id: ticketSubscribe.Id},PlaceSport:[{Id:itemToDelete.Id}]})
                .then(data => {
                    setItemToDelete(null)
                    getTicketSubscribeSports()
                }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
        }

        return (
            <>
                <Modal show={itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف ورزش"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete && "حذف " + itemToDelete.sport.Name}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setItemToDelete(null)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                حذف
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }

    return (
        <>
            <Portlet>
                <PortletHeader
                    title={"ورزش های "+ticketSubscribe.Name}
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => setOpenModalAdd(true)}
                            >
                                <AddIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />

                <PortletBody>

                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">name</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ticketSubscribeSports.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right">{row.sport.Name}</TableCell>
                                    <TableCell align="left">
                                        <Button variant={"contained"}
                                                size={"small"}
                                                color={"error"}
                                                onClick={(e) => setItemToDelete(row)}>حذف</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
            {renderModalDelete()}
        </>
    );
};

export default TicketSubscribeSport;