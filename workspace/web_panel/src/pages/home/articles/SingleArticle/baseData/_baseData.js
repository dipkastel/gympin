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

                        <TextField
                            label="اسلاگ"
                            placeholder="اسلاگ"
                            value={article.Slug}
                            type={"text"}
                            onChange={(e) => updateArticle("Slug", e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            label="اولویت از نظر گوگل"
                            placeholder="بین 0.2 تا 0.6"
                            value={article.SeoPriority||0.6}
                            type={"number"}
                            onChange={(e) => updateArticle("SeoPriority", e.target.value)}
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
