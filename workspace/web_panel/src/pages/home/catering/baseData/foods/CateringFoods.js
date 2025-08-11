import React, {useContext, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {Modal} from "react-bootstrap";
import {Button, FormControlLabel, IconButton, Switch, TableCell, TablePagination, TextField} from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import {getRppFoodsManagement, SetRppFoodsManagement} from "../../../../../helper/pocket/pocket";
import AddIcon from "@mui/icons-material/Add";
import {useEffect} from "react/index";
import {TicketFoods_add, TicketFoods_query, TicketFoods_update} from "../../../../../network/api/TicketFoods.api";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../helper";
import {Edit} from "@mui/icons-material";


const CateringFoods = ({catering}) => {


    const error = useContext(ErrorContext);
    const history = useHistory();
    const [foods, setFoods] = useState(null);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(getRppFoodsManagement());
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [addHasNext, setAddHasNext] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);


    useEffect(() => {
        getFoods()
    }, [perPage,page]);


    function getFoods() {
        TicketFoods_query({
            queryType: "FILTER",
            PlaceId:catering.Id,
            paging: {
                Page: page,
                Size: perPage,
                Desc: true
            }
        }).then(result => {
            setFoods(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    function renderModalAdd() {

        function add(e) {
            e.preventDefault()
            TicketFoods_add({
                Place: {Id: catering.Id},
                Name: e.target.Name.value,
                PlacePrice: toPriceWithoutComma(e.target.PlacePrice.value),
                ValuePrice: addHasNext?toPriceWithoutComma(e.target.PlacePrice.value):toPriceWithoutComma(e.target.ValuePrice.value),
                maxOrderCount:1000,
                minOrderCount:1,
                Enable:true,
                IsCount:true,
                Description:""
            })
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    if(!addHasNext){
                        setOpenModalAdd(false)
                    }else{
                        e.target.Name.value = null;
                        e.target.PlacePrice.value = null;
                        e.target.Name.focus();
                    }
                    getFoods();
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
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <form onSubmit={(e) => add(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن غذا "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TextField
                                id="standard-full-width"
                                label="نام غذا"
                                placeholder="نام غذا"
                                name={"Name"}
                                type={"text"}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {!addHasNext&&<TextField
                                id="standard-full-width"
                                label="ارزش به تومان"
                                placeholder="ارزش به تومان"
                                name={"ValuePrice"}
                                onChange={e =>
                                    e.target.value = toPriceWithComma(e.target.value)
                                }
                                type={"text"}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />}

                            <TextField
                                id="standard-full-width"
                                label="قیمت به تومان"
                                name={"PlacePrice"}
                                placeholder="قیمت به تومان"
                                onChange={e =>
                                    e.target.value = toPriceWithComma(e.target.value)
                                }
                                type={"text"}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <FormControlLabel
                                name={"hasNext"}
                                checked={addHasNext}
                                onChange={e=>setAddHasNext(e.target.checked)}
                                control={<Switch value="gilad"/>}
                                label="ورود سریع"
                            />
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
    function renderModalEdit() {

        function editItem(e) {
            e.preventDefault()
            TicketFoods_update({
                Id:itemToEdit.Id,
                Place: {Id: catering.Id},
                Name: e.target.Name.value,
                PlacePrice: toPriceWithoutComma(e.target.PlacePrice.value),
                ValuePrice: toPriceWithoutComma(e.target.ValuePrice.value),
                Enable:true,
                Description:""
            })
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    setItemToEdit(null);
                    getFoods();
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
                <Modal show={!!itemToEdit} onHide={() => setItemToEdit(null)}>
                    <form onSubmit={(e) => editItem(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"ویرایش غذا "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TextField
                                id="standard-full-width"
                                label="نام غذا"
                                placeholder="نام غذا"
                                name={"Name"}
                                type={"text"}
                                fullWidth
                                defaultValue={itemToEdit?.Name}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="standard-full-width"
                                label="ارزش به تومان"
                                placeholder="ارزش به تومان"
                                defaultValue={itemToEdit?.Price}
                                name={"ValuePrice"}
                                onChange={e =>
                                    e.target.value = toPriceWithComma(e.target.value)
                                }
                                type={"text"}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <TextField
                                id="standard-full-width"
                                label="قیمت به تومان"
                                name={"PlacePrice"}
                                placeholder="قیمت به تومان"
                                defaultValue={itemToEdit?.Price}
                                onChange={e =>
                                    e.target.value = toPriceWithComma(e.target.value)
                                }
                                type={"text"}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setItemToEdit(null)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                ویرایش
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
                    title={"غذا های " + catering?.Name}

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
                                <TableCell align="right">id</TableCell>
                                <TableCell align="right">نام</TableCell>
                                <TableCell align="right">قیمت</TableCell>
                                <TableCell align="left">عملیات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {foods?.content && foods?.content?.map((item, number) => (
                                <TableRow hover role={"checkbox"} tabIndex={-1}
                                          key={"searched" + item.Id.toString()}>
                                    <TableCell align="right">{item.Id}</TableCell>
                                    <TableCell align="right">{item.Name}</TableCell>
                                    <TableCell align="right">{toPriceWithComma(item.Price)}</TableCell>
                                    <TableCell align="left"><IconButton onClick={(e)=>setItemToEdit(item)} ><Edit color={"primary"} /></IconButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {(foods?.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={foods?.totalElements || 0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param) => {
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={perPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setPerPage(parseInt(event.target.value, 10));
                            SetRppFoodsManagement(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
            {renderModalEdit()}
        </>
    );
};

export default CateringFoods;
