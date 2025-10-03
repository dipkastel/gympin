import React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

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
