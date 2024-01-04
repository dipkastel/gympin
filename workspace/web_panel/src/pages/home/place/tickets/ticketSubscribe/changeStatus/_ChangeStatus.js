import React, {useContext, useState} from 'react';
import {ListItem, ListItemText, Switch} from "@mui/material";
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";
import {TicketSubscribes_ChangeTicketSubscribesStatus} from "../../../../../../network/api/ticketSubscribes.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";

const _changeStatus = ({ticketSubscribe, updateTicketSubscribe}) => {
    const error = useContext(ErrorContext);
    const [inTicketSubscribe, SetInTicketSubscribe] = useState(ticketSubscribe)

    function setFormValues(lable, value) {
        TicketSubscribes_ChangeTicketSubscribesStatus({...inTicketSubscribe, [lable]: value}).then(data => {
            SetInTicketSubscribe(data.data.Data)
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
                    title={"تغییر وضعیت " + ticketSubscribe.Name}
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
                            checked={inTicketSubscribe.Enable}
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

export default _changeStatus;
