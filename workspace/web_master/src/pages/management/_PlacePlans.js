import React from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemText,
    TextField
} from "@mui/material";

const _PlaceGates = () => {
    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    sx={{paddingBottom:0}}
                    title={"پلن های مجموعه"}/>

                <CardContent  sx={{margin:0 ,paddingTop:0}}>
                    <List >
                        <ListItem component="a" href={"/management/plans"} alignItems="flex-start" sx={{width: '100%',  bgcolor: 'background.paper',color:"#000000"}}>
                            <ListItemText
                                className="text-start"
                                primary="بدنسازی"

                            />
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem component="a" href={"/management/plans"} alignItems="flex-start" sx={{width: '100%',  bgcolor: 'background.paper',color:"#000000"}}>
                            <ListItemText
                                className="text-start"
                                primary="تکواندو"/>
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem component="a" href={"/management/plans"} alignItems="flex-start" sx={{width: '100%',  bgcolor: 'background.paper',color:"#000000"}}>
                            <ListItemText
                                className="text-start"
                                primary="پیلاتس"/>
                        </ListItem>
                        <Divider variant="inset"  component="li"/>
                        <ListItem component="a" href={"/management/plans"} alignItems="flex-start" sx={{width: '100%',  bgcolor: 'background.paper',color:"#000000"}}>
                            <ListItemText
                                className="text-start"
                                primary="استخر"/>
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem component="a" href={"/management/plans"} alignItems="flex-start" sx={{width: '100%',  bgcolor: 'background.paper',color:"#000000"}}>
                            <ListItemText
                                className="text-start"
                                primary="ایروبیک"/>
                        </ListItem>
                        <Divider variant="inset"  component="li"/>
                        <ListItem component="a" href={"/management/plans"} alignItems="flex-start" sx={{width: '100%',  bgcolor: 'background.paper',color:"#000000"}}>
                            <ListItemText
                                className="text-start"
                                primary="trx"/>
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                    </List>
                </CardContent>
            </Card>
        </>

    );
};

export default _PlaceGates;
