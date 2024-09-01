import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import {corporate_getCorporateGroups} from "../../../network/api/corporate.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {corporatePersonnel_update} from "../../../network/api/corporatePersonnel.api";

const _UserGroup = ({corporatePersonnel,updatePage}) => {


    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [groups, setGroups] = useState([])
    const [selctedGroups, setSelectedGroups] = useState(0)

    useEffect(() => {
        getCorporateCategories();
    }, []);


    function getCorporateCategories() {
        corporate_getCorporateGroups({Id: corporate.Id}).then(result => {
            setGroups(result.data.Data);
            setSelectedGroups(corporatePersonnel?.PersonnelGroup?.Id)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function setPersonGroup(group) {
        corporatePersonnel_update({id: corporatePersonnel.Id, PersonelGroup: {Id: group.target.value}}).then(result => {
            setSelectedGroups(result?.data?.Data?.PersonnelGroup.Id)
            error.showError({message: "ثبت موفق",});
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
            {groups&&
            <Card elevation={3} sx={{margin: 1}}>
                <CardContent>
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-name-label">تغییر گروه کاربر</InputLabel>
                        {groups &&<Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            input={<OutlinedInput label="تغییر گروه کاربر  "/>}
                            value={selctedGroups}
                            onChange={(e) => setPersonGroup(e)}
                        >
                            {groups.map((cat) => (
                                <MenuItem
                                    key={cat.Id}
                                    value={cat.Id}
                                >
                                    {cat.Name}
                                </MenuItem>
                            ))}
                        </Select>}
                    </FormControl>
                </CardContent>
            </Card>
            }
        </>
    );
};

export default _UserGroup;
