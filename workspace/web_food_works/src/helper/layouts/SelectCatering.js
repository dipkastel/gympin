import React, {useContext, useEffect, useState} from 'react';
import {Chip, CircularProgress, Typography} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {placePersonnel_CateringPersonnelByUser, placePersonnel_PersonnelByUser} from "../../network/api/placePersonnel.api";
import {cateringActions} from "../redux/actions/CateringActions";

const SelectCatering = (props) => {
    const error = useContext(ErrorContext);
    const user = useSelector(({auth}) => auth.user);
    const [loading, setLoding] = useState(false)
    const [selectedCatering, SetSelectedCatering] = useState(useSelector(({catering}) => catering.catering))
    const [personCaterings, SetPersonCaterings] = useState([]);
    useEffect(() => {
        getUserCaterings();
    }, []);


    function getUserCaterings() {
        if (selectedCatering) return;
        if (personCaterings.length > 0) return;
        setLoding(true);
        placePersonnel_CateringPersonnelByUser({id: user.Id}).then(result => {
            setLoding(false);
            SetPersonCaterings(result.data.Data)
            if (result.data.Data.length < 1)
                error.showError({message: "مرکزی برای کاربر وجود ندارد",});
            if (!selectedCatering) {
                setCateringForUser(result.data.Data[0].Catering);
            }
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function setCateringForUser(catering) {
        if(selectedCatering) return;
        if (!catering) return;
        SetSelectedCatering(catering);
        props.SetCatering(catering);
    }


    return (
        <>
            {loading && <CircularProgress size="1.5rem"/>}
            {!loading && selectedCatering && <Chip component={"a"} sx={{cursor: "pointer"}} href={"/settings/caterings"}
                                                   label={<Typography variant={"subtitle"}>{selectedCatering.Name}</Typography>}/>}
        </>
    );
};

export default connect(null, cateringActions)(SelectCatering);
