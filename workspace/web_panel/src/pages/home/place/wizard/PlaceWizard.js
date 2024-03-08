import React from 'react';
import Notice from "../../../partials/content/Notice";
import {Box, Button, Step, StepLabel, Stepper, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import _wizardPlaceBase from "./pages/_wizardPlaceBase";
import _wizardOtherInfo from "./pages/_wizardOtherInfo";
import _wizardImages from "./pages/_wizardImages";
import _wizardPlaceAbout from "./pages/_wizardPlaceAbout";
import _wizardActivePlace from "./pages/_wizardActivePlace";
import _wizardTickets from "./pages/tickets/_wizardTickets";
import _wizardBeneficiaries from "./pages/_wizardBeneficiaries";

const stepsStatusEnum = {empty:"empty",completed:"completed",skipped:"skipped"}


const PlaceWizard = () => {

    const [allowGoNext, setAllowGoNext] = React.useState(true);
    const [activeStep, setActiveStep] = React.useState(0);
    const [stepStatus, setStepStatus] = React.useState([]);

    const steps = [
        {id:0,name: 'اطلاعات اولیه', isOptional: false,fragment:<_wizardPlaceBase allowNext={(e)=>setAllowGoNext(e)}/>},
        {id:1,name: 'اطلاعات تکمیلی', isOptional: false,fragment:<_wizardOtherInfo allowNext={(e)=>setAllowGoNext(e)}/>},
        {id:2,name: 'مالی', isOptional: false,fragment:<_wizardBeneficiaries allowNext={(e)=>setAllowGoNext(e)}/>},
        {id:3,name: 'بلیط ها', isOptional: false,fragment:<_wizardTickets allowNext={(e)=>setAllowGoNext(e)}/>},
        {id:4,name: 'تصاویر', isOptional: false,fragment:<_wizardImages allowNext={(e)=>setAllowGoNext(e)}/>},
        {id:5,name: 'قوانین', isOptional: false,fragment:<_wizardPlaceAbout allowNext={(e)=>setAllowGoNext(e)} />},
        {id:6,name: 'فعالسازی', isOptional: false,fragment:<_wizardActivePlace allowNext={(e)=>setAllowGoNext(e)} />}
    ];


    const handleNext = () => {
        if(activeStep==steps.length-1){
            alert("done");
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setStepStatus((prevStateStatus)=>[...prevStateStatus,{stepId:steps[activeStep].id,status:stepsStatusEnum.completed}]);
        setAllowGoNext(false);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!steps[activeStep].isOptional) {
            throw new Error("You can't skip a step that isn't optional.");
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setStepStatus((prevSkipped) => [...prevSkipped,{stepId:steps[activeStep].id,status:stepsStatusEnum.skipped}]);
    };

    return (
        <>
            <Notice icon="kt-font-primary">
                <Box sx={{width: '100%'}}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((step, index) => {
                            var stepProps={completed:null};
                            var labelProps = {optional: null};
                            if (step.isOptional) {
                                labelProps.optional = (
                                    <Typography variant="caption">اختیاری</Typography>
                                );
                            }
                            stepProps.completed = (stepStatus.find(ss=>ss.stepId==step.id)?.status == stepsStatusEnum.completed)

                            return (
                                <Step key={step.name} {...stepProps}>
                                    <StepLabel sx={{ml:1,mr:0}} {...labelProps}>{step.name}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Box>
            </Notice>
            <Box sx={{width: "100%"}}>
                <Paper sx={{width: "100%", mb: 2}}>
                    <Toolbar>
                        <Typography
                            sx={{flex: "1 1 100%"}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            <Typography sx={{mt: 2, mb: 1}}>{steps[activeStep].name}</Typography>
                        </Typography>
                    </Toolbar>
                </Paper>
            </Box>
            {steps[activeStep].fragment}
            <Box sx={{width: "100%"}}>
                <Paper sx={{width: "100%", mb: 2}}>
                        <React.Fragment>
                            <Box sx={{display: 'flex', flexDirection: 'row', p: 2}}>
                                <Button
                                    color="inherit"
                                    variant={"contained"}
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{mr: 1}}
                                >
                                    قبلی
                                </Button>
                                <Box sx={{flex: '1 1 auto'}}/>
                                {steps[activeStep].isOptional && (
                                    <Button variant={"contained"} color={"warning"} onClick={handleSkip} sx={{ml: 1}}>
                                        رد کردن
                                    </Button>
                                )}
                                <Button variant={"contained"} onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'ثبت نهایی' : 'بعدی'}
                                </Button>
                            </Box>
                        </React.Fragment>
                </Paper>
            </Box>
        </>
    );
};

export default PlaceWizard;
