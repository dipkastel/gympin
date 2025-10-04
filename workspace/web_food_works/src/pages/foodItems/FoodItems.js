import React, {useContext, useEffect, useState} from 'react';
import Grid from "@mui/material/Grid2";
import {
    Button,
    Card,
    CardActions,
    Checkbox,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TableCell,
    TableContainer,
    TablePagination,
    TextField,
    Typography
} from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {TicketFoods_add, TicketFoods_delete, TicketFoods_query} from "../../network/api/TicketFoods.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {Check, Delete, Percent} from "@mui/icons-material";
import {Form} from "react-bootstrap";
import _ItemDrawer from "./_ItemDrawer";

const FoodItems = () => {

    const catering = useSelector(({catering}) => catering.catering);
    const error = useContext(ErrorContext);
    const [item, setItem] = useState(null);
    const [inputValue, setInputValue] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [discount, setDiscount] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        getFoods()
    }, [catering, page, perPage]);

    function getFoods() {
        if (!catering) return;
        TicketFoods_query({
            queryType: "FILTER",
            Name: inputValue,
            PlaceId: catering.Id,
            paging: {Page: page, Size: perPage, Desc: true}
        }).then((data) => {
            setItem(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function renderModalAdd() {
        function submitRequest(e) {
            e.preventDefault();
            setOpenModalAdd(false);
            TicketFoods_add({
                Place: {Id: catering.Id},
                Name: e.target.name.value,
                PlacePrice: toPriceWithoutComma(e.target.price.value),
                ValuePrice: !discount ? toPriceWithoutComma(e.target.price.value) : toPriceWithoutComma(e.target.valuePrice.value),
                Enable: true,
                IsCount: e.target.isCount.checked,
                MinOrderCount: e.target.minOrderCount.value,
                MaxOrderCount: e.target.maxOrderCount.value,
                Description: e.target.desc.value
            }).then((result) => {
                getFoods()
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <Dialog
                open={openModalAdd}
                maxWidth={"sm"}
                onClose={() => setOpenModalAdd(false)}
            >
                <Form onSubmit={(e) => submitRequest(e)}>
                    <DialogTitle>{"افزودن آیتم"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="نام آیتم"
                            type="text"
                            fullWidth
                            variant={"outlined"}
                        />
                        <FormControl
                            margin="dense" fullWidth variant="outlined">
                            <InputLabel>قیمت (تومان)</InputLabel>
                            <OutlinedInput
                                type={'text'}
                                name={"price"}
                                onChange={e =>
                                    e.target.value = toPriceWithComma(e.target.value)
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                'تخفیف'
                                            }
                                            edge="end"
                                            color={discount ? "error" : "inherit"}
                                            onClick={(e) => setDiscount(!discount)}
                                        >
                                            {<Percent/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="قیمت (تومان)"
                            />
                        </FormControl>
                        <Collapse in={discount}>
                            <TextField
                                margin="dense"
                                name="valuePrice"
                                label="ارزش"
                                type="text"
                                onChange={e =>
                                    e.target.value = toPriceWithComma(e.target.value)
                                }
                                fullWidth
                                variant={"outlined"}
                            />
                        </Collapse>
                        <TextField
                            margin="dense"
                            name="minOrderCount"
                            label="حداقل سفارش"
                            type="number"
                            defaultValue={1}
                            fullWidth
                            variant={"outlined"}
                        />
                        <TextField
                            margin="dense"
                            name="maxOrderCount"
                            label="حداکثر سفارش"
                            type="number"
                            defaultValue={1000}
                            fullWidth
                            variant={"outlined"}
                        />
                        <FormGroup>
                            <FormControlLabel name={"isCount"} control={<Checkbox defaultChecked/>} label="غذای اصلی"/>
                        </FormGroup>
                        <TextField
                            margin="dense"
                            name="desc"
                            label="توضیحات"
                            multiline={true}
                            rows={5}
                            type="text"
                            fullWidth
                            variant={"outlined"}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            sx={{px: 7, mb: 2, mx: 2}}
                            type={"submit"}
                            variant={"outlined"}
                            color={"success"}
                        >
                            ثبت
                        </Button>
                    </DialogActions>
                </Form>
            </Dialog>
        );
    }


    return (
        <>
            <Grid
                container
                direction={"row"}
                columns={12}
            >
                <Grid size={12}>
                    <Card sx={{m: 2, p: 2}} variant={"outlined"}>
                        <Grid container direction={"row"} justifyContent={"space-between"}>
                            <Typography>لیست آیتم های قابل فروش</Typography>
                            <Button variant={"contained"} onClick={(e) => setOpenModalAdd(true)}>افزودن آیتم</Button>
                        </Grid>
                    </Card>
                </Grid>
                <Grid size={12}>
                    <Card sx={{m: 2, p: 2}} variant={"outlined"}>

                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >id</TableCell>
                                        <TableCell >نام آیتم</TableCell>
                                        <TableCell align="center">ارزش</TableCell>
                                        <TableCell align="center">قیمت</TableCell>
                                        <TableCell align="center">غذای اصلی</TableCell>
                                        <TableCell align="center">حداقل (تعداد)</TableCell>
                                        <TableCell align="center">حداکثر (تعداد)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {item?.content?.map((row) => (
                                        <TableRow
                                            hover

                                            key={row.name}
                                            sx={{cursor: "pointer"}}
                                        >
                                            <TableCell onClick={(e)=>setSelectedItem(row)} component="th" scope="row">
                                                {row.Id}
                                            </TableCell>
                                            <TableCell onClick={(e)=>setSelectedItem(row)} component="th" scope="row">
                                                {row.Name}
                                            </TableCell>
                                            <TableCell onClick={(e)=>setSelectedItem(row)} align="center">{toPriceWithComma(row.ValuePrice)}</TableCell>
                                            <TableCell onClick={(e)=>setSelectedItem(row)} align="center">{toPriceWithComma(row.Price)}</TableCell>
                                            <TableCell onClick={(e)=>setSelectedItem(row)} align="center">{row.IsCount && <Check/>}</TableCell>
                                            <TableCell onClick={(e)=>setSelectedItem(row)} align="center">{row.MinOrderCount}</TableCell>
                                            <TableCell onClick={(e)=>setSelectedItem(row)} align="center">{row.MaxOrderCount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <CardActions sx={{justifyContent: "right"}}>
                            {(item?.totalElements > 0) && <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                                component="div"
                                count={item?.totalElements || 0}
                                labelRowsPerPage={<Typography sx={{mt: 2}}>تعداد نمایش</Typography>}
                                labelDisplayedRows={(param) => {
                                    return <Typography
                                        sx={{mt: 2}}>{`${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`}</Typography>
                                }}
                                rowsPerPage={perPage}
                                page={page}
                                onPageChange={(event, newPage) => setPage(newPage)}
                                onRowsPerPageChange={(event) => {
                                    setPerPage(parseInt(event.target.value, 10));
                                    setPage(0);
                                }}
                            />}
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <_ItemDrawer selectedItem={selectedItem} setSelectedItem={setSelectedItem} updateList={getFoods}/>
            {renderModalAdd()}

        </>

    );
};

export default FoodItems;
