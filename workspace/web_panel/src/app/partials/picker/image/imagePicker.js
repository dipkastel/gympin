import React from 'react';
import {
    AppBar,
    Button,
    Dialog,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    IconButton,
    Slide,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Close ,ExpandMore } from '@material-ui/icons';
import "./imagePicker.css"
import AllImages from "../../../pages/home/media/AllImages";
import AddImage from "../../../pages/home/media/AddImage";
import ImagePickerConsts from "./imagePickerConsts";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ImagePicker(props) {
    const [open, setOpen] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [selectMode, setSelectMode] = React.useState(ImagePickerConsts.SELECTMODE_SINGLE);
    const [selected, setSelected] = React.useState([]);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        props.onChange(selected);
    }
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    function OnImageSelect(images){
        setSelected(images);
    }
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                انتخاب تصویر
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className="appBar">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                            <Close/>
                        </IconButton>
                        <Typography variant="h6" className="title">
                            نصاویر
                        </Typography>
                        <Button color="inherit" className="btn-select" onClick={handleClose}>
                            انتخاب
                        </Button>
                    </Toolbar>
                </AppBar>


                <div className="main-inputs">
                    <ExpansionPanel expanded={expanded === 'addImage'} onChange={handleChange('addImage')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className="heading">افزودن تصویر جدید</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <AddImage />
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'selectImage'} onChange={handleChange('selectImage')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore/>}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography className={"heading"}>انتخاب از تصاویر موجود</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <AllImages selectMode={selectMode} onImageSelect={OnImageSelect}/>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>

            </Dialog>
        </div>
    );
}
export default ImagePicker;
