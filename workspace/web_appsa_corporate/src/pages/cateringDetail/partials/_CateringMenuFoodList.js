import React from 'react';
import {Button, Card, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid2";
import {toPriceWithComma} from "../../../helper/utils";
import {Add, DinnerDining, Liquor} from "@mui/icons-material";

const _CateringMenuFoodList = ({title, Items,onAddClick}) => {
    return (
        <Card elevation={10}>
            <CardHeader title={title}/>
            <CardContent sx={{px: 2}}>
                <TableContainer component={Paper}>
                    <Table  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>نام</TableCell>
                                <TableCell align="right">قیمت</TableCell>
                                <TableCell align="right">عملیات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Items.map((row) => (
                                <TableRow
                                    hover={true}
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.Food.IsCount&&<DinnerDining sx={{mr:1}} />}
                                        {row.Food.Name}
                                    </TableCell>
                                    <TableCell align="right">{toPriceWithComma(row?.Food?.Price)}</TableCell>
                                    <TableCell align="right"><IconButton fullWidth variant={"contained"} color={"secondary"} onClick={()=>onAddClick(row)}> <Add/> </IconButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default _CateringMenuFoodList;
