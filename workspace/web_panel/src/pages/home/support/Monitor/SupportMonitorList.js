import React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {Chip} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import {SetRppSupport} from "../../../../helper/pocket/pocket";

const SupportMonitorList = () => {
    return (
        <>
            <Box sx={{width: "100%"}}>
                <Paper sx={{width: "100%", mb: 2}}>
                    <Toolbar>
                        <Typography
                            sx={{flex: "1 1 100%"}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                           کاربران آنلاین
                        </Typography>
                    </Toolbar>


                </Paper>
            </Box>
        </>
    );
};

export default SupportMonitorList;
