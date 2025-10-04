import React, {useContext, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Modal} from "react-bootstrap";
import {Button, TableCell, TablePagination, TextField, Typography} from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {getRppFoodsManagement, SetRppFoodsManagement} from "../../../../../helper/pocket/pocket";
import {useEffect} from "react/index";
import {TicketFoods_query, TicketFoods_update} from "../../../../../network/api/TicketFoods.api";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../helper";
import _AddFoodItem from "./_AddFoodItem";
import {CheckBox, CheckBoxOutlineBlank} from "@mui/icons-material";
import _EditFoodItem from "./_EditFoodItem";


const CateringFoods = ({catering}) => {


    const error = useContext(ErrorContext);
    const [foods, setFoods] = useState(null);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(getRppFoodsManagement());
    const [selectedItem, setSelectedItem] = useState(null);


    useEffect(() => {
        getFoods()
    }, [perPage, page]);


    function getFoods() {
        TicketFoods_query({
            queryType: "FILTER",
            PlaceId: catering.Id,
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
    return (
        <>
            <_EditFoodItem selectedItem={selectedItem} setSelectedItem={setSelectedItem} refreshList={getFoods} />

            <Portlet>
                <PortletHeader
                    title={"غذا های " + catering?.Name}

                    toolbar={<_AddFoodItem catering={catering} refreshList={getFoods}/>}
                />
                <PortletBody>
                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">id</TableCell>
                                <TableCell align="right">نام</TableCell>
                                <TableCell align="right">فعال</TableCell>
                                <TableCell align="right">غذا</TableCell>
                                <TableCell align="right">حداقل سفارش</TableCell>
                                <TableCell align="right">حداکثر سفارش</TableCell>
                                <TableCell align="left">قیمت</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {foods?.content && foods?.content?.map((item, number) => (
                                <TableRow hover role={"checkbox"} tabIndex={-1}
                                          key={"searched" + item.Id.toString()} onClick={(e)=>setSelectedItem(item)}>
                                    {console.log(item)}
                                    <TableCell align="right">{item.Id}</TableCell>
                                    <TableCell align="right">{item.Name}</TableCell>
                                    <TableCell align="right">{item.Enable?<CheckBox />:<CheckBoxOutlineBlank />}</TableCell>
                                    <TableCell align="right">{item.IsCount?<CheckBox />:<CheckBoxOutlineBlank />}</TableCell>
                                    <TableCell align="right">{item.MinOrderCount}</TableCell>
                                    <TableCell align="right">{item.MaxOrderCount}</TableCell>
                                    <TableCell align="left">
                                        <Typography variant={"caption"} sx={{textDecoration:"line-through",display:"inline-flex",px:1}}> {toPriceWithComma(item.ValuePrice)}</Typography>
                                        <Typography variant={"subtitle1"} sx={{display:"inline-flex"}}> {toPriceWithComma(item.Price)}</Typography></TableCell>
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
                        rowsPerPage={parseInt(perPage)}
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
        </>
    );
};

export default CateringFoods;
