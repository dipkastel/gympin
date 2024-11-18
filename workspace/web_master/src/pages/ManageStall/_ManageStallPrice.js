import React from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl,
    FormGroup,
    FormHelperText, ImageList, ImageListItem,
    Input,
    InputLabel, TextField
} from "@mui/material";

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
];
const _ManageGatePrice = (props) => {
    const [open, setOpen] = React.useState(false);

    function renderRemoveButton() {
        return (
            <Button variant={"contained"} title={"btn_add"} onClick={handleClickOpen}>حذف منو</Button>
        )
    }

    function ModalDeleteFood(){
        return (
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>حذف عضویت</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           آیا حذف منو {props.name} را تایید میکنید؟
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>لغو</Button>
                        <Button onClick={handleClose}>تایید</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function getValue() {
        return Math.floor(Math.random() * 10) * 16000
    }

    return (
        <>
            <Card elevation={3} sx={{borderRadius: 3,margin: 1}}>
                <CardHeader
                    sx={{paddingBottom: 0}}
                    title={props.name}
                    action={renderRemoveButton()}
                />
                <CardContent sx={{margin: 0}}>
                    <FormGroup>
                        <FormControl sx={{margin: 1}}>
                            <InputLabel htmlFor="my-input">توضیح</InputLabel>
                            <Input multiline={true} aria-describedby="my-helper-text"/>
                        </FormControl>
                        <FormControl sx={{margin: 1}}>
                            <InputLabel htmlFor="my-input">قیمت</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text" value={getValue()}/>
                        </FormControl>
                        <FormControl sx={{margin: 1}}>
                            <InputLabel htmlFor="my-input">قیمت ویژه</InputLabel>
                            <Input aria-describedby="my-helper-text"/>
                            <FormHelperText id="my-helper-text">قیمت با تخفیف</FormHelperText>
                        </FormControl>
                        <FormControl sx={{margin: 1}}>
                            <Button variant={"contained"}>ثبت</Button>
                        </FormControl>
                    </FormGroup>
                    <ImageList cols={3} rowHeight={160}>
                        {itemData.map((item) => (
                            <ImageListItem key={item.img}>
                                <img
                                    src={`${item.img}?w=140&h=140&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=140&h=140&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                                <Button variant={"contained"} title={"btn_add"} onClick={handleClickOpen}>حذف</Button>
                            </ImageListItem>
                        ))}

                        <img
                            height={160}
                            width={120}
                            src={`https://static.thenounproject.com/png/396915-200.png?w=140&h=140&fit=crop&auto=format`}
                            srcSet={`https://static.thenounproject.com/png/396915-200.png?w=140&h=140&fit=crop&auto=format&dpr=2 2x`}
                            alt={"add"}
                            loading="lazy"
                        />
                    </ImageList>
                </CardContent>
            </Card>

            {ModalDeleteFood()}
        </>
    );
};

export default _ManageGatePrice;
