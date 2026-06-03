import React, {useContext, useEffect, useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import {Button, Chip, FormControl, FormGroup, Grid, InputLabel, MenuItem, Select, TableCell, TableHead} from "@mui/material";
import Notice from "../../../partials/content/Notice";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {pages_addType, pages_deleteType, pages_getAllTypes, pages_updateType} from "../../../../network/api/pages.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {PagesElementsEnum} from "../../../../helper/enums/PagesElementsEnum";
import {Delete, EditNote} from "@mui/icons-material";


const PageTypes = () => {
    const error = useContext(ErrorContext);
    const [homeTypes, SetHomeTypes] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [selectedElements, setSelectedElements] = useState([]);
    const [selectedParent, setSelectedParent] = useState(null);
    useEffect(() => {
        getPlaceOption()
    }, []);

    function getPlaceOption() {
        pages_getAllTypes().then(data => {
            SetHomeTypes(data.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function renderModalAdd() {
        function addOption(e) {
            e.preventDefault()
            pages_addType({
                Name: e.target.formName.value,
                Description: e.target.formdesctiption.value,
                Type: e.target.formType.value,
                Parent: e.target.Parent.value,
                Elements: selectedElements
            })
                .then(data => {
                    setOpenModalAdd(false)
                    getPlaceOption()
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                <form onSubmit={(e) => addOption(e)}>


                    <Modal.Header closeButton>
                        <Modal.Title>{"افزودن المان "}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <Form.Group controlId="formName">
                            <Form.Control
                                name="formName"
                                type="text"
                                placeholder="نام المان"
                            />
                        </Form.Group>
                        <Form.Group controlId="formOptionName">
                            <Form.Control
                                name="formType"
                                type="text"
                                placeholder="type"
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Control
                                name="formdesctiption"
                                type="text"
                                placeholder="توضیح"
                            />
                        </Form.Group>
                        <FormGroup>
                            <FormControl>
                                <InputLabel id="demo-multiple-chip-label">زیرمجموعه</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    name="Parent"
                                    value={selectedParent}
                                    label={"زیرمجموعه"}
                                    onChange={(e) => setSelectedParent((typeof e.target.value === 'string') ? e.target.value.split(',') : e.target.value)}

                                >
                                    {homeTypes.filter(p => p.Parent == null).map((item) => (
                                        <MenuItem
                                            key={item.Name + item.Id}
                                            value={item.Id}
                                            // style={getStyles(name, selectedElements, theme)}
                                        >
                                            {item.Name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </FormGroup>
                        <Grid container justifyContent={"center"} spacing={1}>
                            {Object.keys(PagesElementsEnum).map((item) => (
                                <Chip key={item}
                                      color={selectedElements.includes(item) ? "success" : "default"}
                                      onClick={(e) => setSelectedElements(selectedElements.includes(item) ? selectedElements.filter(p => p != item) : [...selectedElements, item])}
                                      label={PagesElementsEnum[item]}/>
                            ))}
                        </Grid>

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
        );
    }

    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            pages_deleteType({Id: itemToDelete.Id})
                .then(data => {
                    setItemToDelete(null)
                    getPlaceOption()
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
                <Modal show={!!itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف المان"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete && "حذف " + itemToDelete.Name}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setItemToDelete(null)}
                            >
                                خیر
                            </Button>
                            <Button className={"button_danger"} type={"submit"}>
                                حذف
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }

    function renderModalEdit() {

        function EditItem(e) {
            e.preventDefault()
            pages_updateType({
                Id: itemToEdit?.Id,
                Name: itemToEdit?.Name,
                Description: itemToEdit?.Description,
                Type: itemToEdit?.Type,
                Parent: itemToEdit?.Parent,
                Elements: itemToEdit?.Elements
            }).then(data => {
                setItemToEdit(null)
                getPlaceOption()
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
                    <form onSubmit={(e) => EditItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"ویرایش المان "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formName">
                                <Form.Control
                                    name="formName"
                                    type="text"
                                    value={itemToEdit?.Name}
                                    onChange={(e)=>setItemToEdit({...itemToEdit,Name:e.target.value})}
                                    placeholder="نام المان"
                                />
                            </Form.Group>
                            <Form.Group controlId="formOptionName">
                                <Form.Control
                                    name="formType"
                                    type="text"
                                    value={itemToEdit?.Type}
                                    onChange={(e)=>setItemToEdit({...itemToEdit,Type:e.target.value})}
                                    placeholder="type"
                                />
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Control
                                    name="formdesctiption"
                                    type="text"
                                    value={itemToEdit?.Description}
                                    onChange={(e)=>setItemToEdit({...itemToEdit,Description:e.target.value})}
                                    placeholder="توضیح"
                                />
                            </Form.Group>
                            <FormGroup>
                                <FormControl>
                                    <InputLabel id="demo-multiple-chip-label">زیرمجموعه</InputLabel>
                                    <Select
                                        labelId="label-parent"
                                        value={homeTypes.find(p => p.Id == itemToEdit?.Parent)?.Id}
                                        label={"زیرمجموعه"}
                                        onChange={(e) => setItemToEdit({...itemToEdit, Parent: e.target.value})}

                                    >
                                        {homeTypes.filter(p => p.Parent == null).map((item) => (
                                            <MenuItem
                                                key={item.Name + item.Id}
                                                value={item.Id}
                                            >
                                                {item.Name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </FormGroup>
                            <Grid container justifyContent={"center"} spacing={1}>
                                {Object.keys(PagesElementsEnum).map((item) => (
                                    <Chip key={item}
                                          color={itemToEdit?.Elements?.includes(item) ? "success" : "default"}
                                          onClick={(e) => setItemToEdit({
                                              ...itemToEdit,
                                              Elements: itemToEdit?.Elements?.includes(item) ? itemToEdit?.Elements?.filter(p => p != item) : [...(itemToEdit?.Elements), item]
                                          })}
                                          label={PagesElementsEnum[item]}/>
                                ))}
                            </Grid>
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
            <Notice icon="flaticon-warning kt-font-primary">مدیریت المان های قابل ارائه
                <p>
                    لطفا سریعا از این صفحه خارج شوید و در صورت عدم اطلاع کافی به هیچ وجه تغییرات ایجاد نکنید
                </p>
            </Notice>

            <Box sx={{width: "100%"}}>
                <Paper sx={{width: "100%", mb: 2}}>
                    <Toolbar>
                        <Typography
                            sx={{flex: "1 1 100%"}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            المان ها
                        </Typography>
                        <Tooltip title="Filter list">
                            <IconButton>
                                <AddIcon onClick={() => setOpenModalAdd(true)}/>
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                    <TableContainer>
                        <Table className={"table"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">id</TableCell>
                                    <TableCell align="right">name</TableCell>
                                    <TableCell align="right">type</TableCell>
                                    <TableCell align="right">description</TableCell>
                                    <TableCell align="right">parent</TableCell>
                                    <TableCell align="right">elements</TableCell>
                                    <TableCell align="left">action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {homeTypes.map(row => (
                                    <TableRow key={row.Id}>
                                        <TableCell align="right" component="th" scope="row">
                                            {row.Id}
                                        </TableCell>
                                        <TableCell align="right">{row.Name}</TableCell>
                                        <TableCell align="right">{row.Type}</TableCell>
                                        <TableCell align="right">{row.Description.substr(0, 90)}</TableCell>
                                        <TableCell align="right">{row.Parent && homeTypes.find((e) => e.Id == row.Parent).Name}</TableCell>
                                        <TableCell align="right">{row.Elements.map(e => <Chip sx={{m: 0.2}} label={PagesElementsEnum[e]}
                                                                                              size={"small"}/>)}</TableCell>
                                        <TableCell align="left">
                                            <IconButton color={"info"} onClick={(e) => setItemToEdit(row)}><EditNote/></IconButton>
                                            <IconButton color={"error"} onClick={(e) => setItemToDelete(row)}><Delete/></IconButton>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        sx={{direction: "ltr"}}
                    />
                    {/*    count={itemCount}*/}
                    {/*    rowsPerPage={parseInt(rowsPerPage)}*/}
                    {/*    parent={parent}*/}
                    {/*    onPageChange={handleChangePage}*/}
                    {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
                </Paper>
            </Box>
            {renderModalAdd()}
            {renderModalDelete()}
            {renderModalEdit()}
        </>
    );
}
export default PageTypes;
