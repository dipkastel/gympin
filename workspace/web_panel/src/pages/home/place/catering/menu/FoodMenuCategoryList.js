import React, {useContext, useState} from 'react';
import {Chip, ListItemText} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {toPriceWithComma} from "../../../../../helper";
import {TicketFoodMenu_add, TicketFoodMenu_delete} from "../../../../../network/api/TicketFoodMenu.api";
import {Modal} from "react-bootstrap";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const FoodMenuCategoryList = ({date,category,menuList,getMenu,catering,allFoods}) => {

    const error = useContext(ErrorContext);
    const [openModalAdd,SetOpenModalAdd] = useState(false);


    function RenderModalAdd() {
        function addToList(e,item) {
            e.preventDefault()
            TicketFoodMenu_add({
                Catering: {Id: catering.Id},
                Food: {Id: item.Id},
                Date: date,
                Status: "AVAILABLE",
                Category:category,
                MinOrderCount: 1,
                MaxOrderCount: 1000
            }).then(result => {
                getMenu()
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }
        function removeFromList(e,item){
            TicketFoodMenu_delete({
                Id:item.Id
            }).then(result => {
                getMenu()
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
                <Modal show={openModalAdd} size={"xl"} onHide={() => SetOpenModalAdd(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن غذا به منو "+category}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {menuList?.map((item,num)=>(
                                <Chip color={"secondary"} size={"medium"} sx={{p:1,m:1}} label={item?.Food?.Name} onClick={e=>removeFromList(e,item)}/>
                            ))}
                            {allFoods?.filter(f=>!menuList.map(o=>o.Food.Id).includes(f.Id))?.map((item,num)=>(
                                <Chip size={"medium"} sx={{p:1,m:1}} label={item?.Name} onClick={e=>addToList(e,item)}/>
                            ))}
                        </Modal.Body>
                </Modal>
            </>
        );
    }




    return (
        <>

            <Portlet>
                <PortletHeader
                    title={category}
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => SetOpenModalAdd(true)}
                            >
                                <Edit/>
                            </button>
                        </PortletHeaderToolbar>
                    }

                />

                <PortletBody>
                    <TableContainer>
                        <Table
                            aria-labelledby="tableTitle"
                            size="medium"
                        >

                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" padding="normal" sortDirection={false}>Id</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>نام آیتم</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>قیمت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>وضعیت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>جزئیات</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {menuList.map((row, index) => {
                                    return (
                                        <TableRow hover tabIndex={-1} key={row.Id.toString()}>
                                            <TableCell component="th"  scope="row" padding="normal"
                                                       align="right">{row?.Id}</TableCell>
                                            <TableCell align="right">{row?.Food?.Name}</TableCell>
                                            <TableCell align="right">{toPriceWithComma(row?.Food?.Price)}</TableCell>
                                            <TableCell align="right">{row?.FoodItemStatus}</TableCell>
                                            <TableCell align="right"><ListItemText primary={"حداقل سفارش : "+row.MinOrderCount} secondary={"حداکثر سفارش : "+row.MaxOrderCount} /> </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PortletBody>
            </Portlet>
            {RenderModalAdd()}
        </>
    );
};

export default FoodMenuCategoryList;
