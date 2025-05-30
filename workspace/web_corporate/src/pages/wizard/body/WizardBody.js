import React, {useEffect, useState} from 'react';
import {getWizardLevel, setWizardLevel} from "../../../helper/pocket";
import {styled} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, {stepConnectorClasses} from '@mui/material/StepConnector';
import {Grid2 as Grid, useColorScheme} from "@mui/material";
import WPageIntro from "../pages/WPageIntro";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import VerifiedIcon from '@mui/icons-material/Verified';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import WPageCorporateDetails from "../pages/WPageCorporateDetails";
import WPageProfile from "../pages/WPageProfile";
import WPageContractData from "../pages/WPageContractData";
import WPageContractSign from "../pages/WPageContractSign";
import WPageUsersList from "../pages/WPageUsersList";
import WPageFinish from "../pages/WPageFinish";

const WizardBody = () => {
    const [level, setLevel] = useState(getWizardLevel());
    const [steps, setSteps] = useState(null);

    const {mode} = useColorScheme();


    useEffect(() => {
        var id = 1;
        var stepsList = new Array();
        // stepsList.push({id: id++, title: 'معرفی جیم پین', icon: <TipsAndUpdatesIcon/>, page: <WPageIntro onNext={onNext}/>})
        stepsList.push({id: id++, title: 'اطلاعات شرکت', icon: <ContactPageIcon/>, page: <WPageCorporateDetails onNext={onNext}/>})
        stepsList.push({id: id++, title: 'پروفایل من (مدیر پنل)', icon: <ContactPageIcon/>, page: <WPageProfile onNext={onNext}/>})
        stepsList.push({id: id++, title: 'اطلاعات قرارداد', icon: <ContactPageIcon/>, page: <WPageContractData onNext={onNext}  />})
        stepsList.push({id: id++, title: 'امضا قرارداد', icon: <HistoryEduIcon/>, page: <WPageContractSign onNext={onNext}/>})
        stepsList.push({id: id++, title: 'اطلاعات پرسنل', icon: <RecentActorsIcon/>, page: <WPageUsersList onNext={onNext}/>})
        stepsList.push({id: id++, title: 'تکمیل', icon: <VerifiedIcon/>, page: <WPageFinish onNext={onNext}/>})
        setSteps(stepsList)
    }, [level]);

    if (!mode) {
        return null;
    }


    function onNext(pageNumber) {
        if (pageNumber) {
            setLevel(pageNumber);
            setWizardLevel(pageNumber);
        } else {
            if (level < 9)
                setWizardLevel(parseInt(level) + 1);
            setLevel(parseInt(level) + 1);
        }

    }

    const ColorlibConnector = styled(StepConnector)(({theme}) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 22,
            right: "calc(50% + 20px)",
            left: "calc(-50% + 20px)",
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundColor: '#6DB3F2'
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundColor: '#18853e'
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            height: 5,
            border: 0,
            backgroundColor:
                theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderRadius: 1
        },
    }));

    const ColorlibStepIconRoot = styled('div')(({theme, ownerState}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundColor: '#6DB3F2',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
            backgroundColor: '#18853e'
        }),
    }));

    function ColorlibStepIcon(props) {
        const {active, completed, className} = props;
        return (
            <ColorlibStepIconRoot ownerState={{completed, active}} className={className}>
                {steps.filter(f => f.id == props.icon)[0].icon}
            </ColorlibStepIconRoot>
        );
    }

    function goToStep(step) {
        if (level > step.id)
            onNext(step.id);
    }

    return (
        <>
            {steps &&
            <>
                <Grid container sx={{width: "100%", height: "auto", overflowY: "none", pt: 1, pb: 1}}>
                    <Stack sx={{ height: "auto"}}>
                        <Stepper alternativeLabel  dir={"rtl"} activeStep={level -1} connector={<ColorlibConnector/>}>
                            {steps.map((step) => (
                                <Step  key={"step" + step.id}>
                                    <StepLabel sx={{direction:"ltr"}} StepIconComponent={ColorlibStepIcon}
                                               onClick={(e) => goToStep(step)}
                                    >{step.title}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Stack>
                </Grid>
                <Grid sx={{
                    width: "100%",
                    height: (mode==='dark')?"1px":"7px",
                    background: (mode==='dark')?"#e7333e":"linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 82%, rgba(221,221,221,1) 97%);"
                }}/>
                {steps.filter(p => p.id == level)[0]?.page}
            </>
            }

        </>
    );
};

export default WizardBody;
