import React from 'react';
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {Badge, Card} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {DinnerDining} from "@mui/icons-material";

const _ProInvoice = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{width: 350, mt: 8}} onClick={toggleDrawer(false)}>
            <Card sx={{m: 1, p: 5}}>sdjkahsd laskd </Card>
        </Box>
    );

    return (
        <>
            <Card sx={{py:4}} onClick={toggleDrawer(true)}>
                <Grid container  justifyContent={"center"}>
                    <Badge badgeContent={4} color="error">
                        <DinnerDining sx={{m:1}} fontSize={"large"}/>
                    </Badge>
                </Grid>
            </Card>
            <Drawer open={open} anchor={'right'} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
};

export default _ProInvoice;
