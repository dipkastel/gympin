import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar, Button,
    Card,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    Grid2 as Grid,
    List,
    ListItemText,
    Radio,
    RadioGroup, Typography
} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {corporateActions} from "../../helper/redux/actions/CorporateActions";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {corporatePersonnel_corporateOwnedByUserId} from "../../network/api/corporatePersonnel.api";
import {CorporateContractType} from "../../helper/enums/CorporateContractType";
import {toPriceWithComma} from "../../helper/utils";
import {CorporateStatusType} from "../../helper/enums/CorporateStatusType";
import {useNavigate} from "react-router-dom";

const SettingsCorporate = (props) => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const user = useSelector(({auth}) => auth.user);
    const [selectedCorporate, SetSelectedCorporate] = useState(useSelector(({corporate}) => corporate.corporate))
    const [personCorporates, SetPersonCorporates] = useState([]);
    useEffect(() => {
        getUserCorporates();
    }, []);


    function getUserCorporates() {
        corporatePersonnel_corporateOwnedByUserId({id: user.Id}).then(result => {
            SetPersonCorporates(result.data.Data)
            if (result.data.Data.length === 1&&selectedCorporate?.Id!==result.data.Data[0]?.Corporate.Id) {
                SetSelectedCorporate(result.data.Data[0]?.Corporate);
                props.SetCorporate(result.data.Data[0]?.Corporate);
                window.location = window.location
            }
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function selectedPlaceChanged(corporateId) {
        const corporate = personCorporates.find(r => r.Corporate.Id == corporateId).Corporate;
        if (corporate) {
            SetSelectedCorporate(corporate);
            props.SetCorporate(corporate);
            window.location = "/"
        }
    }

    return (
        <>


            <title>سازمان های من</title>
            <Grid container columns={9} alignItems={"center"}>
                <Grid size={{md: 6, lg: 6, xl: 6}}><Typography sx={{m: 4}} variant={"h4"}>سازمان های من</Typography></Grid>
                <Grid textAlign={"end"} size={{md: 3, lg: 3, xl: 3}}></Grid>
            </Grid>

            <Grid container columns={4}>
                {personCorporates.map((item, number) => (
                            <Grid size={{xs:4,sm:2,md:1}} key={number}>
                                <Card elevation={3} sx={{margin: 1,p:1,border:"1px solid",borderColor:(selectedCorporate.Id===item?.Corporate?.Id)?"secondary.bgBox":"secondary.contrastText",borderRadius:4}} >
                                    <Grid container direction={"column"} alignItems={"center"} justifyContent={"space-between"}>
                                        <Avatar
                                            sx={{width: 120, height: 120, marginTop: 3}}
                                            alt="corporateImage"
                                            src={item?.Corporate?.Logo?.Url}
                                        />

                                        <ListItemText
                                            primary={item.Corporate.Name+" ( "+CorporateContractType[item?.Corporate?.ContractType]+" )"}
                                            secondary={item?.Corporate?.FinanceCorporate?.TotalDeposit>0&&toPriceWithComma(item?.Corporate?.FinanceCorporate?.TotalDeposit)}
                                        />
                                        <Chip variant={"filled"} color={"success"} size={"small"} label={CorporateStatusType[item?.Corporate?.Status]} sx={{mx:1}}/>
                                        <Grid container justifyContent={"space-around"} spacing={2}>
                                            <Button hidden={!(selectedCorporate.Id===item?.Corporate?.Id)} variant={"outlined"} color={"secondary"} sx={{my:1}} size={"large"} onClick={()=>{navigate("/management/details/")}} >ویرایش</Button>
                                            <Button hidden={(selectedCorporate.Id===item?.Corporate?.Id)} variant={"outlined"} color={"tertiary"} sx={{my:1}} size={"large"} onClick={()=>selectedPlaceChanged(item.Corporate.Id)} >فعالسازی مرکز</Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        ))}


            </Grid>



            {/*<FormControl*/}
            {/*    style={{width: "100%"}}>*/}
            {/*    <RadioGroup*/}
            {/*        aria-labelledby="demo-radio-buttons-group-label"*/}
            {/*        defaultValue="female"*/}
            {/*        name="radio-buttons-group"*/}
            {/*        value={(selectedCorporate) ? selectedCorporate.Id : 9999}*/}
            {/*        onChange={(event) => selectedPlaceChanged(event)}*/}
            {/*    >*/}
            {/*        {personCorporates.map((item, number) => (*/}
            {/*            <div key={number}>*/}
            {/*                <Card elevation={3} sx={{margin: 1}}>*/}
            {/*                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>*/}
            {/*                        <FormControlLabel value={item.Corporate.Id} control={<Radio/>}*/}
            {/*                                          label={<ListItemText*/}
            {/*                                              primary={item.Corporate.Name+" ( "+CorporateContractType[item?.Corporate?.ContractType]+" )"}*/}
            {/*                                              secondary={item?.Corporate?.FinanceCorporate?.TotalDeposit>0&&toPriceWithComma(item?.Corporate?.FinanceCorporate?.TotalDeposit)}*/}
            {/*                                          />}/>*/}
            {/*                        <Chip variant={"filled"} color={"success"} size={"small"} label={CorporateStatusType[item?.Corporate?.Status]} sx={{mx:1}}/>*/}
            {/*                    </Grid>*/}
            {/*                </Card>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </RadioGroup>*/}
            {/*</FormControl>*/}





        </>

    );
};

export default connect(null, corporateActions)(SettingsCorporate)
