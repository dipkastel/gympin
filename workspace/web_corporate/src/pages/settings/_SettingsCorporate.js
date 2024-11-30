import React, {useContext, useEffect, useState} from 'react';
import {
    Card,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    List,
    ListItemText,
    Radio,
    RadioGroup
} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {corporateActions} from "../../helper/redux/actions/CorporateActions";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {corporatePersonnel_corporateOwnedByUserId} from "../../network/api/corporatePersonnel.api";
import {CorporateContractType} from "../../helper/enums/CorporateContractType";
import {toPriceWithComma} from "../../helper/utils";

const _SettingsCorporate = (props) => {
    const error = useContext(ErrorContext);
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

    function selectedPlaceChanged(event) {
        const corporate = personCorporates.find(r => r.Corporate.Id == event.target.value).Corporate;
        if (corporate) {
            SetSelectedCorporate(corporate);
            props.SetCorporate(corporate);
            window.location = "/"
        }
    }

    return (
        <>

            <div>
                <div className={"section-title mt-3"}>
                    سازمان های من
                </div>
            </div>
            <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                <FormControl
                    style={{width: "100%"}}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        value={(selectedCorporate) ? selectedCorporate.Id : 9999}
                        onChange={(event) => selectedPlaceChanged(event)}
                    >
                        {personCorporates.map((item, number) => (
                            <div key={number}>
                                <Card elevation={3} sx={{margin: 1}}>
                                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                        <FormControlLabel value={item.Corporate.Id} control={<Radio/>}
                                                          label={<ListItemText
                                                              primary={item.Corporate.Name+" ( "+CorporateContractType[item?.Corporate?.ContractType]+" )"}
                                                              secondary={item?.Corporate?.FinanceCorporate?.TotalDeposit>0&&toPriceWithComma(item?.Corporate?.FinanceCorporate?.TotalDeposit)}
                                                          />}/>
                                        <Chip variant={"filled"} color={"success"} size={"small"} label={item?.Corporate?.Status} sx={{mx:1}}/>
                                    </Grid>
                                </Card>
                            </div>
                        ))}
                    </RadioGroup>
                </FormControl>


            </List>
        </>

    );
};

export default connect(null, corporateActions)(_SettingsCorporate)
