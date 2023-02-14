import React from "react";
import {Button, FormControl, FormGroup} from "@mui/material";
import {Portlet, PortletBody, PortletHeader,} from "../../../../partials/content/Portlet";

function DeletePlace({place}) {

    return (
        <>
            <Portlet>
                <PortletHeader
                    title={"حذف " + place.Name}
                />

                <PortletBody>
                    <FormControl component="fieldset">
                        <FormGroup>
                            <Button
                                variant="contained"
                                color={"error"}
                                // onClick={(e) => this.openModalDelete(e, sport)}
                            >
                                حذف
                            </Button>
                        </FormGroup>
                    </FormControl>
                </PortletBody>
            </Portlet>

        </>
    );
}

export default DeletePlace;
