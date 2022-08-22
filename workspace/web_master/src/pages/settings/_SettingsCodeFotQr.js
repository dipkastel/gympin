import React from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip, Divider,
    Grid,
    Link, List,
    ListItem,
    ListItemText,
    TextField
} from "@mui/material";


const data=[{
    code:"44-",
    replaceWith:"شماره کمد :"
},{
    code:"55-",
    replaceWith:"شماره طناب :"
},{
    code:"66-",
    replaceWith:"شماره بند TRX :"
}]

const _SettingsCodeFotQr = () => {
    return (
        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={"یادداشت با qr"}
                action={(<>
                    <Button variant={"outlined"}>افزودن</Button>
                </>)}
            />
            <CardContent>

                <TextField
                    id="outlined-message"
                    className="w-100"
                    aria-multiline
                    variant="outlined"
                    margin="normal"
                    name="message"
                    type="text"
                    label={"پیشوند"}
                    multiline
                />
                <TextField
                    id="outlined-message"
                    className="w-100"
                    aria-multiline
                    variant="outlined"
                    margin="normal"
                    name="message"
                    type="text"
                    label={"جایگزینی با"}
                    multiline
                />

                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    {data.map(item=>(
                        <>
                            <ListItem alignItems="flex-start">
                                <Link  href={"/management/singleTicket?id="+item.id} sx={{width:"100%",textDecoration: "none", color: "#666666"}}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <ListItemText
                                            className="text-start"
                                            primary={item.code}
                                            secondary={item.replaceWith}/>
                                        <Grid>
                                            <Button variant={"outlined"}>حذف</Button>
                                        </Grid>
                                    </Grid>
                                </Link>
                            </ListItem>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="li"/>
                        </>
                    ))}

                </List>
            </CardContent>
        </Card>
    );
};
export default _SettingsCodeFotQr;
