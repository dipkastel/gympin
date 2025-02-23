import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {ArticleCategory_getAll} from "../../../../../network/api/articleCategories.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Checkbox, FormControlLabel, List, ListItem, ListItemText, Switch} from "@mui/material";

const _selectCategories = ({itemCategories,changeSelectedCategories}) => {
    const error = useContext(ErrorContext);
    const [categories,SetCategories] = useState([])

    useEffect(() => {
        ArticleCategory_getAll({Page: 0, Size: 100, Desc: true}).then(result=>{
            SetCategories(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);


    return (
        <>
            <Portlet >
                <PortletHeader
                    title={"دسته بندی ها"}
                />
                <PortletBody>
                        <List sx={{maxHeight:"300px",overflowY:"scroll"}}>
                            {categories&&categories.map(item=>(
                                <ListItem key={item.Id} sx={{m:0,p:0}}>
                                    <FormControlLabel control={<Checkbox onChange={(e)=>changeSelectedCategories(e,item)} checked={itemCategories.some(c=>c.Id==item.Id)} />} label={item.Name} />
                                </ListItem>
                            ))}
                        </List>

                </PortletBody>
            </Portlet>
        </>
    );
};

export default _selectCategories;
