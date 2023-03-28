import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import {TextField} from "@mui/material";

const _baseData = ({article,updateArticle}) => {
    return (
        <>
            <Portlet >
                <PortletHeader
                    title={"اطلاعات پایه"}
                />
                <PortletBody>

                    <Form.Group>
                        <TextField
                            label="موضوع مطلب"
                            placeholder="موضوع مطلب"
                            value={article.Title}
                            type={"text"}
                            onChange={(e) => updateArticle("Title", e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </Form.Group>

                </PortletBody>
            </Portlet>
        </>
    );
};

export default _baseData;
