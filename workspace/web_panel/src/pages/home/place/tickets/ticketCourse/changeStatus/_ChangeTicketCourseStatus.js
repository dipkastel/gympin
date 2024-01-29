import React, {useContext, useState} from 'react';
import {ListItem, ListItemText, Switch} from "@mui/material";
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";
import {TicketCourses_ChangeTicketCourseStatus} from "../../../../../../network/api/ticketCourses.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";

const _ChangeTicketCourseStatus = ({ticketCourse, updateTicketCourse}) => {
    const error = useContext(ErrorContext);
    const [inTicketCourse, SetInTicketCourse] = useState(ticketCourse)

    function setFormValues(lable, value) {
        TicketCourses_ChangeTicketCourseStatus({...inTicketCourse, [lable]: value}).then(data => {
            SetInTicketCourse(data.data.Data)
            error.showError({message: "با موفقیت ثبت شد",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <>

            <Portlet>
                <PortletHeader
                    title={"تغییر وضعیت " + ticketCourse.Name}
                />

                <PortletBody>
                    <ListItem>
                        <ListItemText
                            primary={"وضعیت :"}
                            secondary={"تغییر وضعیت "}
                            sx={{ textAlign:"right" }}/>

                        <Switch
                            edge="end"
                            // onChange={handleToggle('wifi')}
                            checked={inTicketCourse.Enable}
                            onChange={(e) => setFormValues('Enable', e.target.checked)}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-wifi',
                            }}
                        />
                    </ListItem>
                </PortletBody>
            </Portlet>

        </>
    );
};

export default _ChangeTicketCourseStatus;
