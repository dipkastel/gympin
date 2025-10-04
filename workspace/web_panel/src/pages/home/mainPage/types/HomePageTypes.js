import React, {useContext, useEffect, useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import {
    Button,
    Chip,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Switch,
    TableCell,
    TableHead
} from "@mui/material";
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
import {homepage_addType, homepage_deleteType, homepage_getAllTypes} from "../../../../network/api/homepage.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";


const elements = [
    {Name: "Title", value: "تیتر"},
    {Name: "Destination", value: "مقصد"},
    {Name: "Description", value: "توضیح"},
    {Name: "Multimedia", value: "تصویر"}
]

const HomePageTypes = () => {
    const error = useContext(ErrorContext);
    const [homeTypes, SetHomeTypes] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [selectedElements, setSelectedElements] = useState([]);
    useEffect(() => {
        getPlaceOption()
    }, []);

    function getPlaceOption() {
        homepage_getAllTypes().then(data => {
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
            homepage_addType({
                Name: e.target.formName.value,
                Description: e.target.formdesctiption.value,
                Type: e.target.formType.value,
                CanBeParent: e.target.formCanBeParent.checked,
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
            <>
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
                            <Form.Group controlId="formDescription">
                                <Form.Control
                                    name="formdesctiption"
                                    type="text"
                                    placeholder="توضیح"
                                />
                            </Form.Group>
                            <Form.Group controlId="formOptionName">
                                <Form.Control
                                    name="formType"
                                    type="text"
                                    placeholder="نام المان"
                                />
                            </Form.Group>

                            <FormGroup>

                                <FormLabel component="legend">قابلیت در بر گرفتن چند المان :</FormLabel>
                                <FormControlLabel
                                    name={"formCanBeParent"}
                                    control={<Switch
                                        value="gilad"/>}
                                    label="فعال"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControl>
                                    {/*<InputLabel id="demo-multiple-chip-label">Chip</InputLabel>*/}
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        value={selectedElements}
                                        onChange={(e) => setSelectedElements((typeof e.target.value === 'string') ? e.target.value.split(',') : e.target.value)}
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                                        renderValue={(selected) => (
                                            <Box>
                                                {selected.map((value) => (
                                                    <Chip key={value}
                                                          label={elements.find(p => p.Name === value).value}/>
                                                ))}
                                            </Box>
                                        )}
                                        // MenuProps={MenuProps}
                                    >
                                        {elements.map((item) => (
                                            <MenuItem
                                                key={item.Name}
                                                value={item.Name}
                                                // style={getStyles(name, selectedElements, theme)}
                                            >
                                                {item.value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </FormGroup>
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
            homepage_deleteType({Id: itemToDelete.Id})
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
                <Modal show={itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن امکانات "}</Modal.Title>
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
                                    <TableCell align="right">elements</TableCell>
                                    <TableCell align="right">canBeParent</TableCell>
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
                                        <TableCell align="right">{row.Description}</TableCell>
                                        <TableCell align="right"><Switch readOnly checked={row.CanBeParent}/></TableCell>
                                        <TableCell align="right">{(row.Elements)?row.Elements.map(e=>(<>{e+","}</>)):""}</TableCell>
                                        <TableCell align="left"><Button variant={"contained"}
                                                                        color={"error"}
                                                                        onClick={(e) => setItemToDelete(row)}>حذف</Button></TableCell>
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
                    {/*    page={page}*/}
                    {/*    onPageChange={handleChangePage}*/}
                    {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
                </Paper>
            </Box>
            {renderModalAdd()}
            {renderModalDelete()}
        </>
    );
}
export default HomePageTypes;
