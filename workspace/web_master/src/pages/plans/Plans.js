import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, FormControlLabel, FormGroup,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import _SinglePlan from "./_SinglePlan";
import AdapterJalaali from "@date-io/jalaali";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {MobileDatePicker} from "@mui/x-date-pickers";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Plans = () => {

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);

    const [value2, setValue2] = React.useState(new Date());

    const handleChange3 = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleChange2 = (newValue) => {
        setValue(newValue);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function renderAddButton() {
        return (
            <Button variant={"contained"} title={"btn_add"} onClick={handleClickOpen}>افزودن پلن</Button>
        )
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function days() {
        var days = []
        for (var i = 1; i < 364; i++) {
            days.push(i)
        }
        console.log(days)
        return days;
    }

    function ModalAddPlan() {
        return (
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>افزودن پلن جدید</DialogTitle>
                    <DialogContent>
                        <Stack spacing={3}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="نام پلن"
                                type="text"
                                fullWidth
                                variant="standard"
                                helperText="نام پلن به کاربر برای شناخت پلن نمایش داده میشود باید واضح و صریح باشد مثال(ورودی استخر صبح ، 12 جلسه بدنسازی ، پیلاتس با خانم X)"
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="تعداد ورود مجاز کاربر"
                                type="number"
                                fullWidth
                                variant="standard"
                            />
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="اعتبار دائمی" {...a11yProps(0)} />
                                    <Tab label="اعتبار زمانی" {...a11yProps(1)} />
                                    <Tab label="اعتبار تا تاریخ" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">مدت اعتبار</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Age"
                                    >
                                        {days().map(i => {
                                            return <MenuItem value={i}>{i} روز</MenuItem>
                                        })
                                        }

                                    </Select>
                                </FormControl>
                            </TabPanel>
                            <TabPanel value={value} index={2}>

                                <LocalizationProvider dateAdapter={AdapterJalaali}>
                                    <Stack spacing={3}>
                                        <MobileDatePicker
                                            label="Date mobile"
                                            inputFormat="MM/dd/yyyy"
                                            value={value2}
                                            onChange={handleChange2}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </TabPanel>
                            <div>

                                <Typography sx={{flexShrink: 0}}>
                                    گیت های قابل استفاده
                                </Typography>
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange3('panel1')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography sx={{width: '33%', flexShrink: 0}}>
                                            شنبه
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox  />} label="بدنسازی صبح ( خانم ها )" />
                                            <FormControlLabel control={<Checkbox  />} label="بدنسازی عصر ( آقایان )" />
                                        </FormGroup>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange3('panel2')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel2bh-content"
                                        id="panel2bh-header"
                                    >
                                        <Typography sx={{width: '33%', flexShrink: 0}}>یکشنبه</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox  />} label="بدنسازی صبح ( خانم ها )" />
                                            <FormControlLabel control={<Checkbox  />} label="بدنسازی عصر ( آقایان )" />
                                        </FormGroup>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel3'} onChange={handleChange3('panel3')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel3bh-content"
                                        id="panel3bh-header"
                                    >
                                        <Typography sx={{width: '33%', flexShrink: 0}}>دوشنبه</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox  />} label="بدنسازی صبح ( خانم ها )" />
                                            <FormControlLabel control={<Checkbox  />} label="بدنسازی عصر ( آقایان )" />
                                        </FormGroup>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel4'} onChange={handleChange3('panel4')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel4bh-content"
                                        id="panel4bh-header"
                                    >
                                        <Typography sx={{width: '33%', flexShrink: 0}}>سه شنبه</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox  />} label="بدنسازی صبح ( خانم ها )" />
                                            <FormControlLabel control={<Checkbox  />} label="بدنسازی عصر ( آقایان )" />
                                        </FormGroup>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel5'} onChange={handleChange3('panel5')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel4bh-content"
                                        id="panel4bh-header"
                                    >
                                        <Typography sx={{width: '33%', flexShrink: 0}}>چهار شنبه</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox  />} label="بدنسازی صبح ( خانم ها )" />
                                            <FormControlLabel control={<Checkbox  />} label="بدنسازی عصر ( آقایان )" />
                                        </FormGroup>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel6'} onChange={handleChange3('panel6')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel4bh-content"
                                        id="panel4bh-header"
                                    >
                                        <Typography sx={{width: '33%', flexShrink: 0}}>پنج شنبه</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox  />} label="بدنسازی صبح ( خانم ها )" />
                                            <FormControlLabel control={<Checkbox  />} label="بدنسازی عصر ( آقایان )" />
                                        </FormGroup>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel7'} onChange={handleChange3('panel7')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel4bh-content"
                                        id="panel4bh-header"
                                    >
                                        <Typography sx={{width: '33%', flexShrink: 0}}>جمعه</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>لغو</Button>
                        <Button onClick={handleClose}>ثبت</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    sx={{paddingBottom: 0}}
                    title={"مدیریت پلن ها"}
                    action={renderAddButton()}/>
                <CardContent sx={{margin: 0}}>
                    <Typography
                        sx={{display: 'inline', margin: 2}}
                        component="p"
                        variant="h6"
                        color="text.primary"
                    >
                        بدنسازی
                    </Typography>
                    <br/>
                    <Typography
                        sx={{display: 'inline', margin: 2}}
                        component="p"
                        variant="caption"
                        color="text.primary"
                    >
                        توجه داشته باشید:
                        <br/>
                        - قیمت ها ساعت 24:00 در سیستم بروز میشود
                        <br/>
                        - بلیط های فروخته شده قیمت جدید را شامل نمیشود
                    </Typography>
                </CardContent>
            </Card>
            <_SinglePlan expire={"2 روز"} count={1} name={"تک جلسه"}/>
            <_SinglePlan expire={"30 روز"} count={12} name={"12 جلسه"}/>
            <_SinglePlan expire={"30 روز"} count={24} name={"24 جلسه"}/>
            {ModalAddPlan()}
        </>

    );
};

export default Plans;
