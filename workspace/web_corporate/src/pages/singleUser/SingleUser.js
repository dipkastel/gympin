import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {
    corporatePersonnel_addPersonnelCredit,
    corporatePersonnel_delete,
    corporatePersonnel_getById,
    corporatePersonnel_update
} from "../../network/api/corporatePersonnel.api";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    Grid, IconButton,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {Form} from "react-bootstrap";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {corporate_getCorporateGroups} from "../../network/api/corporate.api";
import {useSelector} from "react-redux";
import {AssignmentReturned} from "@mui/icons-material";
import _UserDelete from "./partials/_UserDelete";
import _UserGroup from "./partials/_UserGroup";
import _UserCredits from "./partials/_UserCredits";
import _UserBaseData from "./partials/_UserBaseData";

const SingleUser = (props) => {
    const error = useContext(ErrorContext);
    const {PersonnelId} = useParams();
    const [corporatePersonnel, setCorporatePersonnel] = useState(null);
    useEffect(() => {
        document.title = 'اعتبارهای کاربر';
        getCorporatePerson();
    }, [PersonnelId]);

    function getCorporatePerson() {
        corporatePersonnel_getById({id: PersonnelId}).then(result => {
            setCorporatePersonnel(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    return (
        <>

            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-md-6"}>

                        {corporatePersonnel&&<_UserBaseData corporatePersonnel={corporatePersonnel} getCorporatePerson={getCorporatePerson} />}

                        {corporatePersonnel&&<_UserGroup corporatePersonnel={corporatePersonnel} />}
                    </div>
                    <div className={"col-md-6"}>

                        {corporatePersonnel&&<_UserCredits corporatePersonnel={corporatePersonnel} updatePage={getCorporatePerson}/>}

                        {corporatePersonnel&&<_UserDelete corporatePersonnel={corporatePersonnel} />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleUser;
