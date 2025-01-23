import React, {useContext, useEffect, useState} from 'react';
import {Chip, CircularProgress, Typography} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {corporateActions} from "../redux/actions/CorporateActions";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {corporatePersonnel_corporateOwnedByUserId} from "../../network/api/corporatePersonnel.api";

const SelectCorproate = (props) => {
    const error = useContext(ErrorContext);
    const user = useSelector(({auth}) => auth.user);
    const [loading, setLoding] = useState(false)
    const [selectedCorporate, SetSelectedCorporate] = useState(useSelector(({corporate}) => corporate.corporate))
    const [personCorporates, SetPersonCorporates] = useState([]);
    useEffect(() => {
        getUserCorporates();
    }, []);


    function getUserCorporates() {
        if (selectedCorporate) return;
        if (personCorporates.length > 0) return;
        setLoding(true);
        corporatePersonnel_corporateOwnedByUserId({id: user.Id}).then(result => {

            setLoding(false);
            SetPersonCorporates(result.data.Data)
            if (result.data.Data.length < 1)
                error.showError({message: "مرکزی برای کاربر وجود ندارد",});
            if (!selectedCorporate) {
                setCorporateForUser(result.data.Data[0].Corporate);
            }
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function setCorporateForUser(corporate) {
        if (!corporate) return;
        SetSelectedCorporate(corporate);
        props.SetCorporate(corporate);
    }


    return (
        <>
            {loading && <CircularProgress size="1.5rem"/>}
            {!loading && selectedCorporate && <Chip component={"a"} sx={{cursor: "pointer"}} href={"/settings/corporates"}
                                                    label={<Typography variant={"subtitle"}>{selectedCorporate.Name}</Typography>}/>}
        </>
    );
};

export default connect(null, corporateActions)(SelectCorproate);
