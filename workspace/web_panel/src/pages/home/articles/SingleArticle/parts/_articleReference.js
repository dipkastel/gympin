import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {Editor} from "react-draft-wysiwyg";
import {convertFromHTML} from 'draft-convert';
import draftToHtml from "draftjs-to-html";
import {convertToRaw, EditorState} from "draft-js";
import {getSelectedEditor} from "../../../../../helper/pocket/pocket";
import JoditEditor from "jodit-react";
import TipTapEditor from "../Editors/Tiptop/TipTapEditor";
import {Collapse, IconButton} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

const _articleReference = ({article, updateArticle}) => {
    const [defaultEditorState, setDefaultEditorState] = useState();
    const [userSelectedEditor] = useState(getSelectedEditor());
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (userSelectedEditor == "WYSIWYG") {
            if (article.Reference) {
                setDefaultEditorState(EditorState.createWithContent(convertFromHTML(article.Reference)))
            } else {
                setDefaultEditorState(EditorState.createEmpty());
            }
        } else if (userSelectedEditor == "JODIT") {
            if (article.Reference) {
                setDefaultEditorState(article.Reference)
            } else {
                setDefaultEditorState("");
            }
        } else if (userSelectedEditor == "TIPTAP") {
            if (article.Reference) {
                setDefaultEditorState(article.Reference)
            } else {
                setDefaultEditorState("");
            }
        }
    }, [userSelectedEditor]);

    const onEditorStateChange = (editorState) => {
        if (userSelectedEditor == "WYSIWYG") {
            setDefaultEditorState(editorState)
            updateArticle("Reference", draftToHtml(convertToRaw(editorState.getCurrentContent())))
        } else if (userSelectedEditor == "JODIT") {
            setDefaultEditorState(editorState)
            updateArticle("Reference", editorState)
        } else if (userSelectedEditor == "TIPTAP") {
            setDefaultEditorState(editorState)
            updateArticle("Reference", editorState)
        }
    };

    const JODITconfig = {
        readonly: false,
        placeholder: "اینجا بنویسید...",
        toolbarSticky: false,
        language: "fa",
        height: "70VH"
    };
    return (
        <>
            <Portlet>
                <PortletHeader
                    title={"منابع"}
                    toolbar={
                        <PortletHeaderToolbar>
                            <IconButton onClick={(e) => setShow(!show)}>{show ? <ExpandLess/> :
                                <ExpandMore/>}</IconButton>
                        </PortletHeaderToolbar>
                    }
                />

                <Collapse in={show} timeout="auto" unmountOnExit>
                    <PortletBody>
                        {userSelectedEditor == "WYSIWYG" &&
                        <Editor
                            editorState={defaultEditorState}
                            onEditorStateChange={(e) => onEditorStateChange(e)}
                            wrapperClassName="desmo-wrapper public-DraftStyleDefault-ltr"
                            editorClassName="demo-editor public-DraftStyleDefault-rtl"
                        />
                        }
                        {userSelectedEditor == "JODIT" &&
                        <JoditEditor
                            value={defaultEditorState}
                            config={JODITconfig}
                            onBlur={(newContent) => onEditorStateChange(newContent)}
                        />
                        }
                        {userSelectedEditor == "TIPTAP" &&
                        <TipTapEditor content={defaultEditorState}
                                      onChange={(newContent) => onEditorStateChange(newContent)}
                                      placeholder="شروع به نوشتن کنید…"/>
                        }
                    </PortletBody>
                </Collapse>
            </Portlet>
        </>
    );
};

export default _articleReference;
