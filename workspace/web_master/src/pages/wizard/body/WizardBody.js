import React, {useEffect, useState} from 'react';
import {getWizardLevel, setWizardLevel} from "../../../helper/pocket";
import {styled} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PeopleIcon from '@mui/icons-material/People';
import GavelIcon from '@mui/icons-material/Gavel'
import GiteIcon from '@mui/icons-material/Gite';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import CameraIcon from '@mui/icons-material/Camera';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import StepConnector, {stepConnectorClasses} from '@mui/material/StepConnector';
import {Grid} from "@mui/material";
import WPageSports from "../pages/WPageSports";
import WPageSelectPlace from "../pages/WPageSelectPlace";
import WPageOptions from "../pages/WPageOptions";
import WPageImages from "../pages/WPageImages";
import WPagePersonel from "../pages/WPagePersonel";
import WPageAbout from "../pages/WPageAbout";
import WPageHalls from "../pages/WPageHalls";
import WPageHallTimes from "../pages/WPageHallTimes";
import WPageTickets from "../pages/WPageTickets";
import WPageSubscribes from "../pages/WPageSubscribes";
import WPageCourses from "../pages/WPageCourses";
import WPageCamera from "../pages/WPageCamera";
import WPageFinish from "../pages/WPageFinish";
import {useSelector} from "react-redux";
import store from "../../../helper/redux/store";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";
import WPageProfile from "../pages/WPageProfile";
import WPageBases from "../pages/WPageBases";
import {OtherHouses} from "@mui/icons-material";

const WizardBody = () => {
    const [level, setLevel] = useState(getWizardLevel());

    const [steps, setSteps] = useState(null);
    const [halls, setHalls] = useState(null);
    const [stickets, setSTickets] = useState(null);
    const [ctickets, setCTickets] = useState(null);
    const currentUser = useSelector(state => state.auth.user);


    useEffect(() => {
        try {
            store.dispatch(sagaActions.RequestServerSettings(currentUser));
        } catch (e) {
        }
    }, []);

    useEffect(() => {
        var id = 1;
        var stepsList = new Array();
        stepsList.push({
            id: id++,
            title: 'مجموعه',
            icon: <LocationCityIcon/>,
            page: <WPageSelectPlace onNext={onNext}/>
        })
        stepsList.push({id: id++, title: 'اطلاعات پایه', icon: <OtherHouses/>, page: <WPageBases onNext={onNext}/>})
        stepsList.push({
            id: id++,
            title: 'پروفایل',
            icon: <SelfImprovementIcon/>,
            page: <WPageProfile onNext={onNext}/>
        })
        stepsList.push({id: id++, title: 'ورزش ها', icon: <SportsBaseballIcon/>, page: <WPageSports onNext={onNext}/>})
        stepsList.push({id: id++, title: 'امکانات', icon: <CoffeeMakerIcon/>, page: <WPageOptions onNext={onNext}/>})
        stepsList.push({id: id++, title: 'دوربین', icon: <CameraIcon/>, page: <WPageCamera onNext={onNext}/>})
        stepsList.push({id: id++, title: 'تصاویر', icon: <CameraAltIcon/>, page: <WPageImages onNext={onNext}/>})
        stepsList.push({id: id++, title: 'پرسنل', icon: <PeopleIcon/>, page: <WPagePersonel onNext={onNext}/>})
        stepsList.push({id: id++, title: 'قوانین', icon: <GavelIcon/>, page: <WPageAbout onNext={onNext}/>})
        stepsList.push({
            id: id++,
            title: 'سالن ها',
            icon: <GiteIcon/>,
            page: <WPageHalls onNext={onNext} hallListChange={hallListChange}/>
        })

        if (halls)
            for (var hallNumber in halls) {
                stepsList.push({
                    id: id++,
                    title: 'سالن ' + halls[hallNumber].Name,
                    icon: <GiteIcon/>,
                    page: <WPageHallTimes onNext={onNext} hallParamId={halls[hallNumber].Id}/>
                })
            }
        stepsList.push({
            id: id++,
            title: 'فروشی ها',
            icon: <ConfirmationNumberIcon/>,
            page: <WPageTickets onNext={onNext} ticketSubscribeChanges={sticketChanges}
                                ticketCourseChanges={cticketChanges}/>
        })
        if (stickets)
            for (var ticketNumber in stickets) {
                stepsList.push({
                    id: id++,
                    title: stickets[ticketNumber].Name,
                    icon: <BookOnlineIcon/>,
                    page: <WPageSubscribes onNext={onNext} ParamId={stickets[ticketNumber].Id}/>
                })
            }
        if (ctickets)
            for (var ticketNumber in ctickets) {
                stepsList.push({
                    id: id++,
                    title: ctickets[ticketNumber].Name,
                    icon: <BookOnlineIcon/>,
                    page: <WPageCourses onNext={onNext} ParamId={ctickets[ticketNumber].Id}/>
                })
            }
        stepsList.push({id: id++, title: 'فعالسازی', icon: <ToggleOffIcon/>, page: <WPageFinish onNext={onNext}/>})
        setSteps(stepsList)
    }, [halls, stickets, ctickets, level]);


    function hallListChange(items) {
        if (items)
            setHalls(items);
    }

    function sticketChanges(items) {
        if (items)
            setSTickets(items);
    }

    function cticketChanges(items) {
        if (items)
            setCTickets(items);
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
            right: "calc(-50% + 20px)",
            left: "calc(50% + 20px)",
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
                <Grid container sx={{width: "100%", height: "auto", overflowY: "none", overflowX: "scroll", pt: 1}}>
                    <Stack sx={{direction: "rtl", height: "auto"}}>
                        <Stepper alternativeLabel activeStep={level - 1} connector={<ColorlibConnector/>}>
                            {steps.map((step) => (
                                <Step key={"step" + step.id}>
                                    <StepLabel StepIconComponent={ColorlibStepIcon}
                                               onClick={(e) => goToStep(step)}
                                    >{step.title}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Stack>
                </Grid>
                <Grid sx={{
                    width: "100%",
                    height: "7px",
                    background: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 82%, rgba(221,221,221,1) 97%);"
                }}/>
                {steps.filter(p => p.id == level)[0]?.page}

            </>
            }

        </>
    );
};

export default WizardBody;
