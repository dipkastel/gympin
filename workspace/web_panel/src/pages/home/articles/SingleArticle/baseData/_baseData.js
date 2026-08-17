import React, {useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import {Collapse, IconButton, TextField} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

const _baseData = ({article, updateArticle}) => {

    const [show, setShow] = useState(false)
    return (
        <>
            <Portlet>
                <PortletHeader
                    title={"اطلاعات پایه"}
                    toolbar={
                        <PortletHeaderToolbar>
                            <IconButton onClick={(e) => setShow(!show)}>{show ? <ExpandLess/> :
                                <ExpandMore/>}</IconButton>
                        </PortletHeaderToolbar>
                    }
                />
                <Collapse in={show} timeout="auto" unmountOnExit>
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
                                value={article.SeoPriority || 0.6}
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
                </Collapse>
            </Portlet>
        </>
    );
};

export default _baseData;
